exports.DATABASE_URL = process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    (process.env.NODE_ENV === 'production' ?
        'mongodb://admin:admin@ds237815.mlab.com:37815/shopping-list-fullstack-capstone' :
        'mongodb://admin:admin@ds237815.mlab.com:37815/shopping-list-fullstack-capstone');
exports.PORT = process.env.PORT || 5001;
