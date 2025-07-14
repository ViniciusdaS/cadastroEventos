
document.addEventListener('DOMContentLoaded', () => {

    const janela = document.getElementById('janela');
    const evento = document.getElementById('addEvento');
    const tabelaEventos = document.getElementById('tabelaEventos');

    evento.addEventListener('click', () => {
        janela.showModal();
    })

    const form = document.getElementById('formJanela');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nome = document.getElementById('campoAddNomeEvento').value;
        const local = document.getElementById('campoAddLocalEvento').value;
        const data = document.getElementById('campoAddDataEvento').value;

        try {
            const res = await fetch('http://localhost:3000/api/eventos', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ nome: nome, local: local, data: data })
            });

            if (res.ok) {
                alert('evento criado com sucesso');
                

            } else {
                const data = await res.json();
                alert(data.message || "Erro ao criar evento");
            }
        } catch (error) {
            alert('Impossível criar evento')
            console.error('Erro bisnho detectado!: ', error);
        }


    });
})