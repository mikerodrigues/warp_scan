require 'arp_scan'
require 'json'
require 'sinatra'
require 'haml'
require 'yaml'

set :static, true
set :root, File.dirname(__FILE__)
set :public, 'public'


$config = YAML.load(File.read('./config.yml'))
@scan_table =  []
$config.each do |id, attrs|
  entry = []
  entry << id
  attrs.each do |k, v|
    entry << v
  end
  @scan_table << entry
end

get '/' do

  haml :scans

  #haml :table
end

get '/results/:scan' do
  haml :table
end

get '/scan' do
  content_type :json
  puts $config
  args = $config['default']['args']
  ARPScan(args).to_hash.to_json
end

get '/scan/:scan' do
  content_type :json
  puts params[:scan]
  puts $config[params[:scan]]['args']
  args = $config[params[:scan]]['args']
  ARPScan(args).to_hash.to_json
end

