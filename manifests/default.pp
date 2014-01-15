class apt_update {
  exec { "aptGetUpdate":
    command => "sudo apt-get update",
    path => ["/bin", "/usr/bin"],
    require => [
      Exec["add-apt-repository nodejs"],
      File["/etc/apt/sources.list.d/10gen.list"],
    ]
  }
}

class nodejs {
  exec { "add-apt-repository nodejs":
    command => "/usr/bin/add-apt-repository ppa:chris-lea/node.js",
    require => Package["python-software-properties"],
  }

  package { "nodejs":
    ensure  => "latest",
    require => [Exec["aptGetUpdate"], Exec["add-apt-repository nodejs"]],
  }
}

class mongodb {
  exec { "apt-key 10gen":
    command => "sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10",
    path => ["/bin", "/usr/bin"],
    unless => "sudo apt-key list | grep 10gen"
  }

  file { "/etc/apt/sources.list.d/10gen.list":
    content => "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen\n",
    owner   => root,
    group   => root,
    mode    => 0644,
    require => Exec["apt-key 10gen"],
  }

  service { "mongodb":
    ensure => "running",
    require => Package["mongodb-10gen"],
  }

  package { "mongodb-10gen":
    ensure => '2.4.6',
    require => Exec["aptGetUpdate"],
  }
}

class tools {
  package { "python-software-properties" :
    ensure => "0.82.7",
  }
}

include apt_update
include tools
include mongodb
include nodejs