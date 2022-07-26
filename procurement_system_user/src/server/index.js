//index.js
const express = require('express')//引用express框架
const app = express()//express的一个实例
const mongoose = require('mongoose')//使用mongodb数据库需要引入mongoose
mongoose.connect('mongodb://120.78.184.70:27017/goods-user', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


//定义数据库操作模型
const Goods = mongoose.model('Goods', new mongoose.Schema({
    name: { type: String },
    company: { type: String },
    standards: { type: String },
    quantity: { type: String },
    price: { type: String },
    address: { type: String },
    remarks: { type: String },
    apply: { type: String, default: "未提交" },
    examine: { type: String, default: "未审批" },
    pass: { type: String },
    reason: { type: String },
    order: { type: String, default: "未生成" },
}))

app.use(require('cors')())//允许跨域。允许前端不同的域来访问接口
app.use(express.json())//express识别提交的json格式数据

//默认首页
app.get('/', async (req, res) => {
    res.send('index')
})
//新增文章，提交数据用post方法
app.post('/api/goods', async (req, res) => {
    const goods = await Goods.create(req.body)
    res.send(goods)
})
//修改文章，提交数据用post方法
app.post('/api/goods/:id', async (req, res) => {
    const goods = await Goods.findByIdAndUpdate(req.params.id, req.body)
    res.send(goods)
})
//改变申请状态
app.post('/api/goods/apply/:id', async (req, res) => {
    const goods = await Goods.findByIdAndUpdate(req.params.id, req.body)
    res.send(goods)
})
//文章列表，获取数据用get方法
app.get('/api/goods', async (req, res) => {
    const goods = await Goods.find()
    res.send(goods)
})
//文章列表，获取单个数据用get方法
app.get('/api/goods/:id', async (req, res) => {
    const goods = await Goods.findById(req.params.id)
    res.send(goods)
})
//删除文章 :id表示接受动态参数
app.delete('/api/goods/:id', async (req, res) => {
    await Goods.findByIdAndDelete(req.params.id)
    res.send({
        status: true
    })
})

app.listen(3001, () => {//启动监听3001端口，设置回调函数
    console.log('http://localhost:3001/')
})
