const apiUrl = 'http://localhost:5001/api/produtos';
const lista = document.getElementById('produto-lista');
const form = document.getElementById('produto-form');

async function carregarProdutos() {
  lista.innerHTML = ''; 

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error('Erro ao buscar produtos');
    const produtos = await res.json();

    produtos.forEach(produto => {
      const li = document.createElement('li');
      li.textContent = `${produto.nome} - R$ ${produto.preco.toFixed(2)} `;

      const btnExcluir = document.createElement('button');
      btnExcluir.textContent = 'Excluir';
      btnExcluir.style.marginLeft = '10px';
      btnExcluir.onclick = () => excluirProduto(produto.id);

      li.appendChild(btnExcluir);
      lista.appendChild(li);
    });
  } catch (error) {
    alert(error.message);
  }
}

async function excluirProduto(id) {
  if (!confirm('Tem certeza que deseja excluir este produto?')) return;

  try {
    const res = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Erro ao excluir produto');

    alert('Produto excluído!');
    carregarProdutos(); 
  } catch (error) {
    alert(error.message);
  }
}

form.onsubmit = async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const preco = parseFloat(document.getElementById('preco').value);

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ nome, preco })
    });
    if (!res.ok) throw new Error('Erro ao adicionar produto');

    form.reset();
    carregarProdutos();
  } catch (error) {
    alert(error.message);
  }
};

carregarProdutos();
