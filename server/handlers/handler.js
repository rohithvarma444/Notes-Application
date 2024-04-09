exports.homepage = async (req, res) => {
    const locals ={ 
        title: "Home",
        description: "this is home page " 
    };
    res.render('home', {
        ...locals, 
        layout: '../views/layout/front-page'
    });
};


