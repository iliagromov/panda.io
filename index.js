const express = require('express')
const path = require('path')

const app = express()

app.set("view engine", 'pug');

app.set('views', path.join(__dirname, './views'));

const port = process.env.PORT || 5000;

app.get('/', (req, res) =>{
    return res.send(`<p>Missing layout name. Please use the following url pattern: http://localhost:${port}/<b>layout-name-here</b></p>`)
})

app.get('/:name', (req, res) => {
    try {
        const layoutName = req.params['name']
        if (
            layoutName === undefined
            || layoutName.length === 0
        ) return res.send(
            `<p>Missing layout name. Please use the following url pattern: http://localhost:${port}/<b>layout name here</b></p>`
        ).status(400)

        return res.render(layoutName)
    } catch (e) {
        return res.send('Error render page: ' + e.message).status(400)
    }
})

app.listen(port, () => {
    console.log(`Start api application at ${port}`);
});