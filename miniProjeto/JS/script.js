const { createApp } = Vue

const app = createApp({
    data() {
        return {
            produto: {
                nome: "Notebook",
                preco: 3500,
                estoque: 10
            },

            produtoReserva: {
                nome: "Celular",
                preco: 2000,
                estoque: 3
            },

            produtoEscolhido: null,

            compra: {
                quant: 0,
                desconto: 15,
                mensagem: "",
                status: false,
                descontoStatus: false
            }
        }
    },

    created() {
        this.produtoEscolhido = this.produto
    },

    computed: {

        nomeproduto() {
            return this.produtoEscolhido.nome
        },

        precoFormatado() {
            return this.produtoEscolhido.preco.toLocaleString(
                'pt-BR',
                {
                    style: 'currency',
                    currency: 'BRL'
                }
            )
        },

        estoque() {
            return this.produtoEscolhido.estoque
        },

        quantidade: {
            get() {
                return this.compra.quant
            },

            set(valor) {
                this.compra.quant = valor
            }
        },

        total() {
            return this.produtoEscolhido.preco * this.compra.quant
        },

        totalComDesconto() {
            if (this.compra.descontoStatus) {
                return this.total -
                    this.total * (this.compra.desconto / 100)
            }

            return this.total
        },

        totalFormatado() {
            return this.totalComDesconto.toLocaleString(
                'pt-BR',
                {
                    style: 'currency',
                    currency: 'BRL'
                }
            )
        },

        descontoAtivo() {
            return this.compra.descontoStatus
        },

        mensagemcompra() {
            return this.compra.mensagem
        }
    },

    methods: {

        confirmarCompra() {
            this.verificarEstoque()

            if (this.compra.status) {
                this.compra.mensagem = "Compra realizada com sucesso!"
            } else {
                this.compra.mensagem = "Quantidade indisponível em estoque."
            }
        },

        comprarproduto() {
            this.confirmarCompra()
            this.produtoEscolhido.estoque -= this.compra.quant
        },

        verificarEstoque() {
            this.compra.status =
                this.compra.quant > 0 &&
                this.compra.quant <= this.produtoEscolhido.estoque
        },

        aplicarDesconto() {
            if (this.compra.descontoStatus) {
                this.removerDesconto()
            } else {
                this.compra.descontoStatus = true
            }
        },

        removerDesconto() {
            this.compra.descontoStatus = false
        },

        validarDesconto() {
            return (
                this.compra.desconto > 0 &&
                this.compra.desconto < 100
            )
        },

        alterarProduto() {
            if (this.produtoEscolhido === this.produto) {
                this.produtoEscolhido = this.produtoReserva
            } else {
                this.produtoEscolhido = this.produto
            }

            this.compra.mensagem = ""
            this.compra.quant = 1
        }
    }
})

app.mount('#app')