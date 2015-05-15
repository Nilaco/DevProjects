get "/" do
  erb :'index'
end

post "/search" do
  @search = Search.new(
    address: params[:name],
    income: params[:income],
  )

  if logged_in?
    @search.user_id = current_user.id
  end

  if @search.save
    redirect '/'
  end
end

post "/find/gps" do

  #Get gps coordinates from city
  response = HTTParty.get("https://devru-latitude-longitude-find-v1.p.mashape.com/latlon.php",
    query: {
      location: params[:location],
    },
    headers:{
      "X-Mashape-Key" => "TqPrnwHl6Lmsho8FNV2ruZdfKEJjp1Kqml8jsn69xUDD5clHhQ",
      "Accept" => "application/json"
    },
  )

  response.body
end

#Test coordinates LA..............SERVER IS NO LONGER IN EXISTENCE =(
# 34.050657, -118.249684
 # post '/find/crime' do
 #  response = HTTParty.get("https://jgentes-Crime-Data-v1.p.mashape.com/crime?enddate=6%2F25%2F2014&lat=34.050657&long=-118.249684&startdate=6%2F19%2F2010",
 #    headers:{
 #      "X-Mashape-Key" => "TqPrnwHl6Lmsho8FNV2ruZdfKEJjp1Kqml8jsn69xUDD5clHhQ",
 #      "Accept" => "application/json"
 #    }
 #  )
 # end



# JSON.parse(response)['Results'][0]['lat']
# JSON.parse(response)['Results'][0]['lon']
# yassssss
