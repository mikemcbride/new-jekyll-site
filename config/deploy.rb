set :application, "Your Site Name"
set :repository,  "_site"

set :scm, :none

set :deploy_via, :copy
set :copy_compression, :gzip
set :use_sudo, false

# the name of the user that should be used for deployments on your VPS
set :user, "admin"

set :deploy_to, "/var/www/html"

# IP address of your VPS
role :web, ""

after "deploy:create_symlink", "deploy:fix_permissions"

namespace :deploy do
  [:start, :stop, :restart, :finalize_update].each do |t|
    desc "#{t} task is a no-op with jekyll"
    task t, :roles => :app do ; end
  end

  desc "Fix permissions"
  task :fix_permissions do
    # chmod files on the server
    run "chmod 775 -R #{current_path}"
  end
end
