#!/usr/bin/env ruby

require 'date'
require 'digest'
require 'fileutils'
require 'json'
require 'time'
require 'yaml'

ROOT = File.expand_path('../..', __dir__)
OUTPUT = File.join(ROOT, 'preflight')
POSTS = Dir[File.join(ROOT, '_posts', '*.md')].sort

def relative(path)
  path.delete_prefix("#{ROOT}/")
end

head = IO.popen(%w[git rev-parse HEAD], chdir: ROOT, &:read).strip
origin_main = IO.popen(%w[git rev-parse origin/main], chdir: ROOT, &:read).strip
generated_at = Time.now.getlocal('+09:00').iso8601

routes = []
checksums = []
images = []

POSTS.each do |path|
  raw = File.binread(path)
  # Only spaces and tabs are allowed beside a front matter delimiter. Using
  # `\s*` here would consume the first blank line of a post body and make the
  # resulting checksum omit an original byte.
  match = raw.match(/\A---[ \t]*\r?\n(.*?)\r?\n---[ \t]*\r?\n/m)
  abort "Missing YAML front matter: #{path}" unless match

  data = YAML.safe_load(match[1], permitted_classes: [Date, Time], aliases: true) || {}
  source = relative(path)
  slug = File.basename(path, '.md').sub(/^\d{4}-\d{2}-\d{2}-/, '')
  body = raw.byteslice(match.end(0)..-1) || ''

  routes << {
    source: source,
    legacySlug: slug,
    url: "/posts/#{slug}/",
    title: data['title'],
    date: data['date'].to_s
  }

  checksums << {
    source: source,
    algorithm: 'sha256',
    bodyBytes: body.bytesize,
    checksum: Digest::SHA256.hexdigest(body)
  }

  if data['image'].is_a?(Hash) && data['image']['path']
    reference = data['image']['path']
    resolved_path = reference.sub(%r{^/}, '')
    images << {
      source: source,
      kind: 'frontMatter',
      reference: reference,
      alt: data['image']['alt'],
      resolvedPath: resolved_path,
      exists: File.file?(File.join(ROOT, resolved_path))
    }
  end

  body.force_encoding('UTF-8').scan(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/) do |alt, reference|
    next unless reference.start_with?('/assets/', 'assets/')

    resolved_path = reference.split(/[?#]/, 2)[0].sub(%r{^/}, '')
    images << {
      source: source,
      kind: 'markdown',
      reference: reference,
      alt: alt,
      resolvedPath: resolved_path,
      exists: File.file?(File.join(ROOT, resolved_path))
    }
  end
end

metadata = {
  generatedAt: generated_at,
  head: head,
  originMain: origin_main,
  postCount: POSTS.length
}

FileUtils.mkdir_p(OUTPUT)
File.write(File.join(OUTPUT, 'legacy-post-routes.json'), JSON.pretty_generate(metadata.merge(routes: routes)) << "\n")
File.write(
  File.join(OUTPUT, 'post-body-checksums.json'),
  JSON.pretty_generate(metadata.merge(scope: 'exact bytes after closing YAML front matter delimiter', posts: checksums)) << "\n"
)
File.write(
  File.join(OUTPUT, 'post-image-references.json'),
  JSON.pretty_generate(
    metadata.merge(
      referenceCount: images.length,
      missingCount: images.count { |image| !image[:exists] },
      references: images
    )
  ) << "\n"
)

puts "Generated #{routes.length} routes, #{checksums.length} checksums, and #{images.length} image references."
