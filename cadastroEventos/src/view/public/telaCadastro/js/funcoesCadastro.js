const form = document.getElementById('cadastro');

form.addEventListener('submit', async(e) => {
    e.preventDefault();

    const nome = document.getElementById('campoNome').value;
    const email = document.getElementById('campoEmail').value;
    const senha = document.getElementById('campoSenha').value;

    try {
        const res = await fetch('http://localhost:3000/api/usuarios', {
            method: 'POST', 
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ nome: nome, email: email, senha: senha })
        }); 

        if(res.ok) {
            alert('usuário criado com sucesso');
            location.href = "../telaLogin/index.html";
        } else {
            const data = await res.json();
            alert(data.message || "Erro ao criar usuário");
        }
    } catch(error) {
        alert('Impossível criar usuário')
        console.error('Erro bisonho detectado!: ', error); 
    }
});