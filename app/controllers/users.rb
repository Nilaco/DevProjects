# require 'sinatra'
# require 'httparty'
# require 'json'

# get '/' do
#   content_type :json
# # These code snippets use an open-source library.
# @data = HTTParty.post("https://community-neutrino-ip-info.p.mashape.com/ip-info",
#   headers:{
#     "X-Mashape-Key" => "TqPrnwHl6Lmsho8FNV2ruZdfKEJjp1Kqml8jsn69xUDD5clHhQ",
#     "Content-Type" => "application/x-www-form-urlencoded",
#     "Accept" => "application/json"
#   },
#   parameters:{
#     "ip" => "208.184.96.233",
#     "reverse-lookup" => true
#   })

#   erb :index
# end

#--------------REGISTER--------------
get '/users/new' do
  if logged_in?
    redirect "/users/#{current_user.id}"
  end
  @users = User.new
  erb :'users/new'
end

post '/users' do
  @user = User.new(
    email: params[:email],
    password: params[:password],
    )
    if @user.save
      login(@user)
      redirect "/users/#{current_user.id}"
    else
      status 404
      erb :'/users/new'
    end
end

#------------LOGIN/LOGOUT------------
get "/users/login" do
  if logged_in?
    redirect "/users/#{current_user.id}"
  end

  erb :'users/login'
end

get "/users/:id" do
  if logged_in?
    erb :'users/home'
  else
    redirect '/'
  end
end

post '/login' do
  user = User.where(email: params[:email]).first
  if user && user.password == params[:password]
    login(user)
    redirect "/users/#{user.id}"
  else
    status 404
    @failed_login = true
    redirect '/users/login'
  end
end

post '/logout' do
  logout!
  redirect '/'
end

#-----------User Actions-------------



