require 'arp_scan'
require 'json'
require 'sinatra'
require 'haml'
require 'yaml'
require './lib/table_creator'

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

  run_scan = lambda do
    params[:scan] ||= 'default'
    args = $config[params[:scan]]['args']
    scan = ARPScan(args).to_hash
    info_table = ::TableCreator.create_info_table(scan)
    hosts_table = ::TableCreator.create_hosts_table(scan[:hosts])
    haml :table, :locals => {:info_table => info_table, :hosts_table => hosts_table}
  end

  get '/', &show_scans
  get '/scan/:scan', &run_scan

end
