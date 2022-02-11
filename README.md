# App Icons by Superwall <img src="https://avatars.superwall.dev/id1446224156?size=20" height="40px" width="40px" />  <img src="https://avatars.superwall.dev/com.facebook.Facebook" height="40px" width="40px" /> <img src="https://avatars.superwall.dev/id1138400067?size=20" height="40px" width="40px" /> 

App Icons provides an easy way to get iOS App icons into your service or application. Simply pass the iOS ID, Bundle Identifier, or Name and we'll get the Icon or a nice-looking alternative. 


## How to use App Icons

To fetch an App Icon or generate a nice looking-fallback just embed following URL:

`https://icons.superwall.com/<app-icon|bundle-identifier|name>`

You will receive a `png` image with a size of 100*100px

## Examples


### Bundle Identifer
```
https://icons.superwall.com/com.facebook.Facebook
```

<img src="https://avatars.superwall.dev/com.facebook.Facebook" height="60px" width="60px" />

### Itunes Id
```
https://icons.superwall.com/id1446224156
```


This is the Itunes Id which can be found a the ends of urls like this:  
`https://apps.apple.com/us/app/personal-trainer-fitnessai/id1446224156`

<img src="https://avatars.superwall.dev/id1446224156" height="60px" width="60px" />

### App Name

```
https://icons.superwall.com/Facebook
```

Since we don't have the bundle indentifier, we'll genreate a fallback using a gradient & first letter

<img src="https://avatars.superwall.dev/Facebook" height="60px" width="60px" />

## Usecase
Are you creating a new app/website involving iOS Apps? 

Do you want to display the app's icons or a nice looking placeholder? This service takes care of it. 

### Deploy to Heroku
Do you want to deploy avatar to Heroku?
We got all that covered for you.
Just click this button:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/superwall-me/avatar)

### Credits

Huge shoutout to @tobiaslins for creating the [original avatar project](https://github.com/tobiaslins/avatar)!
