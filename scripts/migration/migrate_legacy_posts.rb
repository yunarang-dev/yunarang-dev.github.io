#!/usr/bin/env ruby
# frozen_string_literal: true

require 'date'
require 'digest'
require 'fileutils'
require 'json'
require 'time'
require 'yaml'

ROOT = File.expand_path('../..', __dir__)
SOURCE_DIR = File.join(ROOT, '_posts')
TARGET_DIR = File.join(ROOT, 'src/content/posts')
MANIFEST_PATH = File.join(ROOT, 'preflight/migrated-post-body-checksums.json')

# Only metadata is translated here. The legacy Markdown body is copied byte for
# byte into its source-language block; a later editorial pass can add a real
# translation to the opposite-language block without changing the source body.
JA_TITLE_OVERRIDES = {
  'CT-02' => '[CT] 02. 1週目 — プレイヤー状態と Heat・Core UI を作る （ゲームマル２０２６夏コンテスト）',
  'CT-03' => '[CT] 03. 2週目 — HP 減少 VFX・Low HP 警告と HUD プレハブを整理する （ゲームマル２０２６夏コンテスト）',
  'CT-04' => '[CT] 04. 3週目 — サイバーパンクスタイル HUD リメイクとスキル・死亡演出を実装する （ゲームマル２０２６夏コンテスト）',
  'CT-05' => '[CT] 05. 4週目 — ESC 一時停止とマウス反応型 Pause 画面を作る （ゲームマル２０２６夏コンテスト）',
  'CT-06' => '[CT] 06. 5週目 — Resume・音量設定と Core 2・3 UI に対応する （ゲームマル２０２６夏コンテスト）',
  'CT-07' => '[CT] 07. 6週目 — 共通 UI プレハブを実際のプレイシーンに統合する （ゲームマル２０２６夏コンテスト）',
  'CT-08' => '[CT] 08. 6週間の旅、そしてその終わり。 （ゲームマル２０２６夏コンテスト）',
  'VX-01' => '[VX] 01. ルミ・Codex・Unity、初の連携試行',
  'VX-02' => '[VX] 02. ルミと Codex の Git/GitHub 作業権限に関する指針を改訂',
  'VX-03' => '[VX] 03. Codex と Lumi に関するガイドラインを改訂',
  'VX-04' => '[VX] 04. 初めてのゲーム開発テスト (Test #1)',
  'VX-05' => '[VX] 05. ルミに Obsidian の企画を読ませ、開発計画を立てさせる',
  'VX-06' => '[VX] 06. 複雑な企画を読み込み、ルミが自らゲームを実装する (Test #2-1)',
  'VX-07' => '[VX] 07. 敵と戦闘を実装する (Test #2-2)',
  'VX-08' => '[VX] 08. Codex 使用量枯渇に備えた Antigravity Failover の試行',
  'VX-09' => '[VX] 09. ルミのレベルデザイン実装 (Test #2-3)',
  'VX-10' => '[VX] 10. 従来のルミ/Codex と独立した Independent Review プロセスを追加 (Test #2-3)'
}.freeze

KO_TITLE_OVERRIDES = {
  'AD-00' => '[AD] 00. The Project 『아스데이: Astral Days!』',
  'AD-01' => '[AD] 01. 평범했던 어느 날, 내게 꿈이 생겨났다. (계기 편)',
  'ET-01' => '[ET] 01. 『아스데이』에 대한, 지극히 개인적인 이야기.',
  'CS-01' => '[CS] 01. 기초적인 동적 계획법 연습과 피보나치 수열 계산',
  'EV-01' => '[EV] 01. SEGA 취업 설명회에 다녀왔습니다.',
  'AD-02' => '[AD] 02. 지금까지의 발걸음, 그리고 앞으로. (스토리 편)',
  'CT-01' => '[CT] 01. 첫 본격적인 팀 프로젝트의 시작 (게임마루 2026 여름 콘테스트)',
  'EV-02' => '[EV] 02. Unity Korea & UNIDEV 네트워킹 데이',
  'VX-00' => '[VX] 00. 『Project VX』 시동!'
}.freeze

CATEGORY_KO = {
  '『Astral Days!』の企画・開発秘話' => '『Astral Days!』 기획 · 개발 비화',
  '雑記' => '잡기',
  'CS・プログラミング練習' => 'CS · 프로그래밍 연습',
  'ゲーム業界イベント記録' => '게임 업계 이벤트 기록',
  'コンテスト・成果物' => '콘테스트 · 결과물',
  'Project VX' => 'Project VX'
}.freeze

TAG_KO = {
  'アスデイ' => '아스데이',
  'アスデイ企画' => '아스데이 기획'
}.freeze

DESCRIPTION_KO = {
  'AD-00' => '이 새벽이 끝나더라도, 빛나는 하루를 향해.',
  'AD-01' => '『아스데이: Astral Days!』 기획의 계기',
  'ET-01' => '『아스데이: Astral Days!』의 비하인드 스토리',
  'CS-01' => 'C++로 간단한 동적 계획법 연습',
  'EV-01' => 'UNIDEV 소속으로 SEGA 취업 설명회에 참가했다.',
  'CT-01' => '팀의 구성 과정과 첫 팀 프로젝트의 시작',
  'CT-02' => '플레이어 상태를 간단히 확인하는 기능을 기획·구현',
  'CT-03' => 'VFX와 시각 효과 구현',
  'CT-04' => 'HUD 디자인 리메이크',
  'VX-00' => 'Virtual Developer Transformation――그 가능성을 시험하다. AI를 활용해 사람의 아이디어를 어디까지 실현할 수 있는지 시험하는 실험 프로젝트.',
  'VX-01' => 'AI 오케스트레이터 「루미」, AI 코딩 에이전트 「Codex」, 그리고 「Unity CLI & MCP」를 연동',
  'VX-02' => '「루미」의 Git 하네싱 설계.'
}.freeze

DESCRIPTION_JA = {
  'VX-08' => 'Codex 使用量枯渇に備えた Antigravity への Failover 構造の試行'
}.freeze

def fail_with(message)
  warn "migration error: #{message}"
  exit 1
end

def parse_source(path)
  raw = File.binread(path)
  match = raw.match(/\A---\r?\n(.*?)\r?\n---\r?\n/m)
  fail_with("front matter not found: #{path}") unless match

  data = YAML.safe_load(match[1], permitted_classes: [Date, Time], aliases: true)
  fail_with("front matter is not a mapping: #{path}") unless data.is_a?(Hash)

  [data, raw.byteslice(match[0].bytesize..)]
end

def body_locale(body)
  readable_body = body.dup.force_encoding(Encoding::UTF_8)
  fail_with('legacy post body is not valid UTF-8') unless readable_body.valid_encoding?

  hangul = readable_body.scan(/[가-힣]/).length
  kana = readable_body.scan(/[ぁ-んァ-ン]/).length
  hangul > kana ? 'ko' : 'ja'
end

def text_without_line_break_markup(value)
  value.to_s.gsub(/<br\s*\/?\s*>/i, '').strip
end

def yaml_scalar(value)
  JSON.generate(value)
end

def localized_yaml(label, japanese, korean, indent: '')
  <<~YAML
    #{indent}#{label}:
    #{indent}  ja: #{yaml_scalar(japanese)}
    #{indent}  ko: #{yaml_scalar(korean)}
  YAML
end

def format_date(value)
  return value.strftime('%Y-%m-%dT%H:%M:%S%:z') if value.respond_to?(:strftime)

  value.to_s
end

def project_for(slug)
  return 'astral-days' if slug.start_with?('AD-')
  return 'project-vx' if slug.start_with?('VX-')

  nil
end

def localized_description(slug, raw_description)
  source = text_without_line_break_markup(raw_description)
  return nil if source.empty?

  if slug == 'VX-08'
    return { ja: DESCRIPTION_JA.fetch(slug), ko: source }
  end

  korean = DESCRIPTION_KO.fetch(slug) do
    fail_with("missing Korean description translation for #{slug}")
  end
  { ja: source, ko: korean }
end

def secondary_placeholder(locale)
  if locale == 'ja'
    <<~MARKDOWN
      > 日本語版は準備中です。原文は韓国語でお読みいただけます。
    MARKDOWN
  else
    <<~MARKDOWN
      > 한국어 본문은 준비 중입니다. 원문은 일본어로 읽을 수 있습니다.
    MARKDOWN
  end
end

def build_front_matter(data, slug)
  category = Array(data['categories']).first.to_s
  image = data['image'].is_a?(Hash) ? data['image'] : nil
  tags = Array(data['tags'])
  title_ja = JA_TITLE_OVERRIDES.fetch(slug, data.fetch('title'))
  title_ko = KO_TITLE_OVERRIDES.fetch(slug, data.fetch('title'))

  output = +"---\n"
  output << localized_yaml('title', title_ja, title_ko)
  output << "date: #{yaml_scalar(format_date(data.fetch('date')))}\n"

  description = localized_description(slug, data['description'])
  output << localized_yaml('description', description[:ja], description[:ko]) if description

  output << localized_yaml('category', category, CATEGORY_KO.fetch(category, category))
  if tags.empty?
    output << "tags: []\n"
  else
    output << "tags:\n"
    tags.each do |tag|
      output << "  - ja: #{yaml_scalar(tag)}\n"
      output << "    ko: #{yaml_scalar(TAG_KO.fetch(tag, tag))}\n"
    end
  end
  output << "locales: [ja, ko]\n"

  project = project_for(slug)
  output << "project: #{yaml_scalar(project)}\n" if project

  if image
    output << "image:\n"
    output << "  src: #{yaml_scalar(image['path'].to_s)}\n"
    output << "  alt: #{yaml_scalar(image['alt'].to_s)}\n"
  end

  output << "featured: #{data['pin'] == true}\n"
  output << "legacySlug: #{yaml_scalar(slug)}\n"
  output << "legacyPaths:\n"
  output << "  - #{yaml_scalar("/posts/#{slug}/")}\n"
  output << "---\n\n"
  output
end

FileUtils.mkdir_p(TARGET_DIR)
FileUtils.mkdir_p(File.dirname(MANIFEST_PATH))

entries = []
source_paths = Dir.glob(File.join(SOURCE_DIR, '*.md')).sort

source_paths.each do |source_path|
  slug = File.basename(source_path, '.md').sub(/^\d{4}-\d{2}-\d{2}-/, '')
  next if slug.start_with?('KR-')

  data, body = parse_source(source_path)
  primary_locale = body_locale(body)
  body_text = body.dup.force_encoding(Encoding::UTF_8)
  target_path = File.join(TARGET_DIR, "#{slug.downcase}.md")
  output = +build_front_matter(data, slug)
  output << ":::locale #{primary_locale}\n\n"
  output << body_text
  output << "\n" unless body_text.end_with?("\n")
  output << "\n:::\n\n"
  output << ":::locale #{primary_locale == 'ja' ? 'ko' : 'ja'}\n\n"
  output << secondary_placeholder(primary_locale)
  output << "\n:::\n"

  File.binwrite(target_path, output)
  entries << {
    source: source_path.delete_prefix("#{ROOT}/"),
    target: target_path.delete_prefix("#{ROOT}/"),
    slug: slug,
    primaryLocale: primary_locale,
    sourceBodyChecksum: Digest::SHA256.hexdigest(body),
    sourceBodyBytes: body.bytesize
  }
end

manifest = {
  generatedAt: Time.now.iso8601,
  purpose: 'Post-migration integrity check; checksum covers exact legacy Markdown bytes embedded in the primary locale block.',
  sourcePostCount: source_paths.length,
  excludedLegacyPosts: source_paths.filter_map do |path|
    slug = File.basename(path, '.md').sub(/^\d{4}-\d{2}-\d{2}-/, '')
    path.delete_prefix("#{ROOT}/") if slug.start_with?('KR-')
  end,
  migratedPostCount: entries.length,
  entries: entries
}
File.write(MANIFEST_PATH, JSON.pretty_generate(manifest) + "\n")
puts "Migrated #{entries.length} posts to #{TARGET_DIR.delete_prefix("#{ROOT}/")}."
