require_relative './deezy_bridge'

module TableCreator
  def self.create_hosts_table(hosts_hash)
    array = []
    array << '<table class="hostsTable">'
    array << '  <thead>'
    array << '    <tr>'
    array << '      <th>IP</th>'
    array << '      <th>MAC</th>'
    array << '      <th>OUI</th>'
    array << '      <th>Known?</th>'
    array << '    </tr>'
    array << '  </thead>'
    hosts_hash.each do |hash|
      array << create_host_row(hash)
    end
    array << '</table>'
    array.flatten.join("\n")
  end

  def self.create_host_row(hash)
    array = []
    array << '  <tr>'
    hash.each_key do |k|
      array << "    <td title='' class='#{k}'>" + hash[k] + '</td>'
    end

    if DeezyBridge.mac_to_host(hash[:mac])
      array << "<td title='' class='known'>Yes</td>"
    else
      array << "<td title='' class='known'>No</td>"
    end

    array << '  </tr>'
  end

  def self.create_info_table(info_hash)
    array = []
    array << '<table class="infoTable">'
    array << '  <thead>'
    array << '    <tr>'
    array << '      <th>Interface</th>'
    array << '      <th>Datalink</th>'
    array << '      <th>Version</th>'
    array << '      <th>Hosts Scanned</th>'
    array << '      <th>Hosts Responding</th>'
    array << '      <th>Scan Rate</th>'
    array << '      <th>Scan Duration</th>'
    array << '    </tr>'
    array << '  </thead>'
    array << create_info_row(info_hash)
    array << '</table>'
    array.flatten.join("\n")
  end

  def self.create_info_row(hash)
    array = []
    array << '  <tr>'
    array << '    <td>' + hash[:interface] + '</td>'
    array << '    <td>' + hash[:datalink] + '</td>'
    array << '    <td>' + hash[:version] + '</td>'
    array << '    <td>' + hash[:range_size].to_s + '</td>'
    array << '    <td>' + hash[:reply_count].to_s + '</td>'
    array << '    <td>' + hash[:scan_rate].to_s + '</td>'
    array << '    <td>' + hash[:scan_time].to_s + '</td>'
    array << '  </tr>'
  end

end
