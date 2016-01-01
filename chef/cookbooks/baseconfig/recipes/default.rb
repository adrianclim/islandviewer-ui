#Update apt packages
execute 'apt_update' do
  command 'apt-get update'
end

#Base configuration in Chef
package "apache2"
package "python-pip"
package "mysql-server"
package "mysql-client"
package "libapache2-mod-wsgi"
package "libmysqlclient-dev"
package "python-mysqldb"
package "python-dev"

#Setup MySQL
cookbook_file "islandviewer_20151222.sql" do
  path "/tmp/islandviewer_20151222.sql"
end

execute "create_database" do
  command 'echo "CREATE DATABASE islandviewer; GRANT INSERT, SELECT, DELETE, UPDATE ON islandviewer.* TO ivuser@\'localhost\' IDENTIFIED BY \'password\';" | mysql -u root'
end

execute "restore_dump" do
  command 'mysql -u root islandviewer < /tmp/islandviewer_20151222.sql'
end

#Development
cookbook_file "requirements.txt" do
  path "/tmp/requirements.txt"
end

execute 'setup_dep' do
  command 'pip install -r /tmp/requirements.txt'
end

#Setup apache
cookbook_file "000-default.conf" do
  path "/etc/apache2/sites-available/000-default.conf"
end

#Restart apache
service 'apache2' do
  action :restart
end