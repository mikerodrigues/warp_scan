require 'arp_scan'
require 'json'
require 'sinatra'
require 'haml'
require 'yaml'
require './lib/table_creator'
require './lib/deezy_bridge'

class WarpScan < Sinatra::Base

  set :static, true
  set :root, File.dirname(__FILE__)
  #set :public, 'public'



  $config = YAML.load(File.read('./config.yml'))


  
  DeezyBridge.monitor



  show_scans = lambda do
    haml :scans
  end

  show_table = lambda do
    haml :table
  end

  run_scan = lambda do
    params[:scan] ||= 'default'
    args = $config[params[:scan]]['args']
    scan = ARPScan(args).to_hash
    info_table = ::TableCreator.create_info_table(scan)
    hosts_table = ::TableCreator.create_hosts_table(scan[:hosts])
    haml :table, :locals => {:info_table => info_table, :hosts_table => hosts_table}
  end

  by_mac = lambda do
    puts :mac
    content_type :json
    DeezyBridge.mac_to_host(params[:mac]).to_json
  end
    
  by_ip = lambda do
    puts params[:ip]
    puts DeezyBridge.ip_to_host(params[:ip])
    content_type :json
    DeezyBridge.ip_to_host(params[:ip]).to_json
  end

  get '/', &show_scans
  get '/scan/:scan', &run_scan
  get '/mac/:mac', &by_mac
  get '/ip/:ip', &by_ip

end
