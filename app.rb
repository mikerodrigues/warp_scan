require 'arp_scan'
require 'json'
require 'sinatra'
require 'haml'

get '/' do
  haml :table
end

get '/scan_report.json' do
  content_type :json

  ARPScan('-l').to_hash.to_json

end
