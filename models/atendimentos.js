const moment = require('moment');
const conexao = require('../infraestrutura/conexao')

class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length > 3

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido, 
                mensagem: 'Cliente deve ter pelo menos tres caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros) {
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            const sql = 'INSERT INTO atendimentos SET ?'
    
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro){
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(resultados)
                }
            })
        }


    }

    lista(res) {
        const sql = 'SELECT * FROM atendimentos'

        conexao.query(sql, (err) => {
            if(err) {
                res.status(400).json(err)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res){
        const sql = `SELECT * FROM atendimentos WHERE id=${id}`

        conexao.query(sql, (err, resultados) => {
            if(err) {
                res.status(400).json(err)
            } else {
                res.status(200).json(resultados)
            } 
        })
    }
}

module.exports = new Atendimento