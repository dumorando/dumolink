# dumolink
a self-hostable link shortener<br />
<br/>

# setup
youre gonna need [Nodejs](https://nodejs.org) installed on the host computer.<br />
then clone the repo and run `npm i`. after that youre gonna want to create a `.env` file.<br />
<br/>
heres a template:

```env
DB_HOST="localhost"
DB_USER="admin"
DB_PASSWORD=""
DB_DATABASE="dumolink"
```

<br />
the app requires you to be using mysql.<br />
once you are done with that you can start running the server with `npm start`. i recommend you use `pm2` if youre self hosting.

# testing
you can use the setup steps but use `npm run devstart` instead of `npm start`.