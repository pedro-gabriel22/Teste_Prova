const express = require('express')
const path = require('path')
const app = express()

app.set('views', path.join(__dirname, 'questao1/templates'))
app.set('view engine', 'ejs')


    let all_cities_list = [
        {
            key: 'key_abadiania',
            name: 'Abadiânia',
            state: 'GO',
            visible: false
        },
        {
            key: 'key_belem',
            name: 'Belém',
            state: 'PA',
            visible: false
        },
        {
            key: 'key_belo-horizonte',
            name: 'Belo Horizonte',
            state: 'MG',
            visible: false
        },
        {
            key: 'key_campinas',
            name: 'Campinas',
            state: 'SP',
            visible: false
        },
        {
            key: 'key_diamantina',
            name: 'Diamantina',
            state: 'MG',
            visible: false
        },
        {
            key: 'key_foz-do-iguacu',
            name: 'Foz do Iguaçu',
            state: 'PR',
            visible: false
        },
        {
            key: 'key_fraiburgo',
            name: 'Fraiburgo',
            state: 'SC',
            visible: false
        },
        {
            key: 'key_franca',
            name: 'Franca',
            state: 'SP',
            visible: false
        },
        {
            key: 'key_goiania',
            name: 'Goiania',
            state: 'GO',
            visible: false
        },
        {
            key: 'key_novo-hamburgo',
            name: 'Novo Hamburgo',
            state: 'RS',
            visible: false
        },
        {
            key: 'key_rio-de-janeiro',
            name: 'Rio de Janeiro',
            state: 'RJ',
            visible: false
        },
        {
            key: 'key_sao-paulo',
            name: 'São Paulo',
            state: 'SP',
            visible: false
        },
        {
            key: 'key_sao-sebastiao',
            name: 'São Sebastiao',
            state: 'SP',
            visible: false
        },
        {
            key: 'key_volta-redonda',
            name: 'Volta Redonda',
            state: 'RJ',
            visible: false
        }
    ]


    app.get('/', (req, res) => {
        res.render('index',{all_cities_list})
    })

app.listen(3000, () => {
    console.log('rodando');
})