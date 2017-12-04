class HomeController < ApplicationController
  def index
  end

  def load_screen
  end

  def get_mason_reviews
    render json: {
        name: "Mason Hall",
        lat: 42.451558,
        long: -79.338888,
        handicap: false,
        rating: 3.0,
        comments: [
           "I didn't have any TP",
           "This was an ok bathroom",
           "Average bathroom. Pretty clean."
        ]
    }
     #######################
  end

  def get_william_reviews
    render json: {
        name: "William Center: 1st Floor",
        lat: 42.450385,
        long: -79.339926,
        handicap: true,
        rating: 4.5,
        comments: [
           "Wow! What bathroom!",
           "Looks brand new!",
            "Very clean!",
            "My favorite bathroom at Fredonia"
        ]
    }
      #######################
    end

    def get_fenton_reviews
      render json: {
          name: "Fenton Hall: 1st Floor",
          lat: 42.450892,
          long: -79.336149,
          handicap: true,
          rating: 2.5,
          comments: [
             "The urinals were not private at all!",
             "the Fenton bathrom smelled weird",
             "Meh it was ok..."
          ]
      }
      #######################

    end

end
