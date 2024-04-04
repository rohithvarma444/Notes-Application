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

exports.about = async (req,res) => {
    const locals = {
        title: "About Page",
        description: "this is about description page"
    }
    res.render('about',locals)
}


