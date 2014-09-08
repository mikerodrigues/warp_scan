require 'arp_scan'
require 'json'
require 'sinatra'
require 'haml'
require 'yaml'

class WarpScan < Sinatra::Base

  set :static, true
  set :root, File.dirname(__FILE__)
  #set :public, 'public'

  $config = YAML.load(File.read('./config.yml'))

  show_scans = lambda do
    haml :scans
  end

  show_table = lambda do
    haml :table
  end

  get_json = lambda do
    content_type :json
    params[:scan] ||= 'default'
    args = $config[params[:scan]]['args']
    ARPScan(args).to_hash.to_json
  end

  get '/', &show_scans
  get '/table/:scan', &show_table
  get '/json', &get_json
  get '/json/:scan', &get_json

end
