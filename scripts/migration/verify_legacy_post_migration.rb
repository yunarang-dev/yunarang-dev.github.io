#!/usr/bin/env ruby
# frozen_string_literal: true

require 'digest'
require 'json'

ROOT = File.expand_path('../..', __dir__)
MANIFEST_PATH = File.join(ROOT, 'preflight/migrated-post-body-checksums.json')
BASELINE_CHECKSUM_PATH = File.join(ROOT, 'preflight/post-body-checksums.json')
IMAGE_MANIFEST_PATH = File.join(ROOT, 'preflight/post-image-references.json')

def abort_with(message)
  warn "verification error: #{message}"
  exit 1
end

manifest = JSON.parse(File.read(MANIFEST_PATH))
baseline_checksums = JSON.parse(File.read(BASELINE_CHECKSUM_PATH))
image_manifest = JSON.parse(File.read(IMAGE_MANIFEST_PATH))
errors = []
baseline_by_source = baseline_checksums.fetch('posts').to_h { |entry| [entry.fetch('source'), entry] }

abort_with("expected 26 migrated posts, got #{manifest['migratedPostCount']}") unless manifest['migratedPostCount'] == 26

target_files = Dir.glob(File.join(ROOT, 'src/content/posts/*.md')).reject { |path| File.basename(path) == '.gitkeep' }
errors << "expected 26 target Markdown files, found #{target_files.length}" unless target_files.length == 26

manifest.fetch('entries').each do |entry|
  source_path = File.join(ROOT, entry.fetch('source'))
  target_path = File.join(ROOT, entry.fetch('target'))

  unless File.file?(target_path)
    errors << "missing target: #{entry['target']}"
    next
  end

  source = File.binread(source_path)
  source_match = source.match(/\A---\r?\n.*?\r?\n---\r?\n/m)
  unless source_match
    errors << "source front matter not found: #{entry['source']}"
    next
  end
  source_body = source.byteslice(source_match[0].bytesize..)

  baseline = baseline_by_source[entry.fetch('source')]
  if baseline.nil?
    errors << "baseline checksum is missing: #{entry['source']}"
    next
  end

  expected_hash = baseline.fetch('checksum')
  errors << "migration manifest checksum differs from preflight baseline: #{entry['source']}" unless entry.fetch('sourceBodyChecksum') == expected_hash
  errors << "source checksum drift from preflight baseline: #{entry['source']}" unless Digest::SHA256.hexdigest(source_body) == expected_hash
  errors << "source byte length drift from preflight baseline: #{entry['source']}" unless source_body.bytesize == baseline.fetch('bodyBytes')

  target = File.binread(target_path)
  marker = ":::locale #{entry.fetch('primaryLocale')}\n\n"
  primary_start = target.index(marker)
  if primary_start.nil?
    errors << "primary locale marker not found: #{entry['target']}"
    next
  end

  embedded_start = primary_start + marker.bytesize
  embedded_body = target.byteslice(embedded_start, entry.fetch('sourceBodyBytes'))
  if Digest::SHA256.hexdigest(embedded_body) != expected_hash
    errors << "embedded body checksum mismatch: #{entry['target']}"
  end
end

selected_sources = manifest.fetch('entries').map { |entry| entry.fetch('source') }.to_h { |path| [path, true] }
copied_media = 0
expected_missing_media = 0
image_manifest.fetch('references').each do |reference|
  next unless selected_sources[reference.fetch('source')]
  next unless reference.fetch('reference').start_with?('/assets/')

  if reference.fetch('exists')
    copied_media += 1
    public_path = File.join(ROOT, 'public', reference.fetch('reference').delete_prefix('/'))
    errors << "missing public media: #{reference['reference']}" unless File.file?(public_path)
  else
    expected_missing_media += 1
  end
end

if errors.empty?
  puts "Migration verification passed: #{manifest['migratedPostCount']} posts; #{copied_media} existing media references reachable; #{expected_missing_media} legacy-missing references documented."
else
  warn errors.join("\n")
  exit 1
end
