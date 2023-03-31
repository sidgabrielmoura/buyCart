class Produto{
    constructor(){
        this.id = 1
        this.arraysProdutos = []
        this.editeId = null
    }

    salvar(){
        let produto = this.lerDados()

        if(this.validaCampo(produto)){
            if(this.editeId == null){
                this.adicionar(produto)
            }else{
                this.atualizar(this.editeId, produto)
            }
            
        }

        this.validaCampo(produto)

        this.listaTabela()

        this.cancelar()
    }

    listaTabela(){
        let tbody = document.querySelector('#tbody')

        tbody.innerText = ''

        for(let i = 0; i < this.arraysProdutos.length; i++){
            let tr = tbody.insertRow()

            let td_id = tr.insertCell()
            let td_produto = tr.insertCell()
            let td_valor = tr.insertCell()
            let td_acoes = tr.insertCell()
            
            td_id.innerText = this.arraysProdutos[i].id
            td_produto.innerText = this.arraysProdutos[i].nomeProduto
            td_valor.innerText = 'R$' + this.arraysProdutos[i].preco

            let imgEdit = document.createElement('img')
            imgEdit.src = './img/edite.png'
            imgEdit.setAttribute("onClick", "produto.preparaEdicao("+ JSON.stringify(this.arraysProdutos[i])  +")")
            let imgdelet = document.createElement('img')
            imgdelet.src = './img/delete.png'
            imgdelet.setAttribute("onClick", "produto.delete("+ this.arraysProdutos[i].id  +")")

            td_acoes.appendChild(imgEdit)
            td_acoes.appendChild(imgdelet)

            td_id.classList.add('center')
            td_valor.classList.add('center')
            td_produto.classList.add('center')
            td_acoes.classList.add('center')
            

        }
    }

    lerDados(){
        let produto = {}

        produto.id = this.id
        produto.nomeProduto = document.querySelector('#produtos').value
        produto.preco = document.querySelector('#valor').value

        return produto
    }

    atualizar(id, produto){
        for(let i = 0; i < this.arraysProdutos.length; i++){
            if(this.arraysProdutos[i].id == id ){
                this.arraysProdutos[i].nomeProduto = produto.nomeProduto
                this.arraysProdutos[i].preco = produto.preco
            }
        }
    }

    preparaEdicao(dados){
        this.editeId = dados.id

        document.querySelector('#produtos').value = dados.nomeProduto
        document.querySelector('#valor').value = dados.preco

        document.querySelector('#btn-s').innerText = 'Atualizar'
    }

    adicionar(produto){
        this.arraysProdutos.push(produto)
        this.id++
    }

    validaCampo(produto){
        let msg = ''

        if(produto.nomeProduto == ''){
            msg += 'por favor informe o nome do produto! \n'
        }
        if(produto.preco == ''){
            msg += 'por favor informe o preço do produto! \n'
        }
        if(msg != ''){
            alert(msg)
            return false
        }

        return true
    }

    cancelar(){
        produto.nomeProduto = document.querySelector('#produtos').value = ''
        produto.preco = document.querySelector('#valor').value = ''

        document.querySelector('#btn-s').innerText = 'Salvar'
        this.editeId = null
    }
    delete(id){
        if(confirm('você realmente deseja deletar o item '+ id + '?')){
            alert('o item '+ id + ' foi deletado!')

            let tbody = document.querySelector('#tbody')

            for(let i = 0; this.arraysProdutos.length; i++){
                if(this.arraysProdutos[i].id == id){
                    this.arraysProdutos.splice(i, 1)
                    tbody.deleteRow(i)
                }
            }
        } 
    }
}

var produto = new Produto()