## Simple notices for Express

The `express-notices` module provides a simple middleware for throwing high-level error, warning and information messages.

Works best with client-side frameworks (e.g. [ScalpelJS](http://inca.github.io/scalpeljs)).

## Installation

Install it:

```
npm install express-notices
```

Configure your app to use notices (somewhere above your main router, but below session configuration):

```
// Your session configuration
// ...
app.use(require('express-notices'));
// ...
app.use(express.router);
```

This installs `notices` object into:

  * `res` to use it inside routes
  * `res.locals` to access it in your templates

## Usage

In your routes:

```
app.get('/login', function(req, res, next) {
  res.render('login');
});

app.post('/login', function(req, res, next) {
  // Check password
  if (!valid) {
    res.notices.error('You have entered invalid username and password.');
    res.redirect('/login');
  } else {
    // Authenticate the user
    // ...
  }
})
```

And in your templates:

```
// ...
body
  #notices
    each notice in notices.get()
      div(class="notice #{notice.kind}")= notice.msg
```

Just apply some styling with CSS and you're all set.

## More usage

Pass parameters like this:

```
res.notices.info('Your request have been processed.');
res.notices.warn('The email %s has already been taken.', email);
res.notices.error('Start date %s is greated than end date %s.', startDate, endDate);
```

## Extension

If you aren't satisfied with default notice levels — `info`, `warn` and `error` — you can add more:

```
app.use(require('express-notices').extend({

  goldAdd: function(amount) {
    this.add('gold', 'You have earned %s gold coins.', amount);
  },

  goldRemove: function(amount) {
    this.add('gold', 'You have lost %s gold coins.', amount);
  }

}));
```

## I18N

`express-notices` uses [i18n-2](https://github.com/jeresig/i18n-node-2) for formatting your messages. If you don't use it, it just formats string using `sprintf`.

## License

MIT License

2013 © Boris Okunskiy