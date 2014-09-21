require 'net/http'
require 'json'
require 'yaml'

module DeezyBridge

  @conf = {}
  @conf[:uri] = "http://localhost:3000/hosts.json?per_page=All"
  @conf[:refresh_rate] = 300

  begin
    # @conf = YAML.load(File.read(File.read('../deezy_bridge_config.yml'))
  rescue
  end

  @@hosts = nil

  def self.hosts
    @@hosts
  end

  def self.monitor
    Thread.new do
      loop do
        uri = URI(@conf[:uri])
        req = Net::HTTP::Get.new(uri)
        res = Net::HTTP.start(uri.hostname, uri.port) {|http| http.request(req)}
        @@hosts = JSON.parse(res.body)
        sleep @conf[:refresh_rate]
      end
    end
  end

  def self.ip_to_host(ip_addr)
    @@hosts.each do |hash| 
      return hash['host'] if ip_addr == hash['host']['ip']
    end
    nil
  end

  def self.mac_to_host(mac)
    @@hosts.each do |hash| 
      return hash['host'] if mac == hash['host']['mac']
    end
    nil
  end

end
  

  
      

 
    
