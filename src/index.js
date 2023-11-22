const express = require('express')
const path=require('path')
const { engine }=require('express-handlebars')
const app = express()
const methodOverride = require('method-override')
const morgan = require('morgan')
const port = 3000
const route=require('./routes/index.js')
const db=require('./config/db')
const sortMiddleware=require('./app/middlewares/SortMiddleware')
db.connect()
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(morgan('combined'))
app.use(sortMiddleware)

app.engine('hbs', engine({
  extname: '.hbs',
  helpers: {
    sum: (a,b)=> a + b,
    sortable: (field, sort)=>{

      const sortType = field === sort.column ? sort.type : 'default'
      const icons={
        default: 'bi bi-arrow-down-up',
        desc: 'bi bi-sort-down',
        asc: 'bi bi-sort-up',
      }
      
      const types={
        default: 'desc',
        asc: 'desc',
        desc: 'asc'
      }
      const icon=icons[sortType]
      const type=types[sortType]

      return ` <a href="?_sort&column=${field}&type=${type}">
        <i class="${icon}"></i>
      </a>  `

    },
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})