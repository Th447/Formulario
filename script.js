/*
//  Perguntas 
const questionMap = {
    'nome_completo': 'Nome completo:',
    'idade': 'Idade:',
    'cidade_mora': 'Cidade onde mora:',
    'estudando_atualmente': 'Está estudando atualmente? Se sim, qual curso e período?',
    'disponibilidade_presencial': 'Possui disponibilidade para trabalhar presencialmente em Nova Lima - MG?',
    'como_soube': 'Como ficou sabendo dessa oportunidade?',
    'resolver_problemas': 'Você curte resolver problemas ou prefere seguir processos já definidos?',
    'trabalhar_sozinho_equipe': 'Prefere trabalhar sozinho ou em equipe?',
    'motivacao_estagio': 'O que te motiva a querer estagiar na área de suporte técnico?',
    'sistemas_operacionais': 'Quais sistemas operacionais você já usou? (Windows, Linux, macOS...)',
    'instalou_programas_problema': 'Já instalou programas ou lidou com algum problema técnico? Conta uma experiência.',
    'formatou_computador_rede': 'Já formatou um computador ou mexeu em configuração de rede?',
    'wifi_ethernet': 'Sabe diferenciar Wi-Fi de Ethernet? Já teve que configurar ou diagnosticar uma conexão?',
    'programas_domina': 'Quais programas você domina? (Ex: Word, Excel, antivírus, navegadores, etc.)',
    'ferramentas_acesso_remoto': 'Já usou ferramentas de acesso remoto, como AnyDesk ou TeamViewer?',
    'sistemas_chamados': 'Já ouviu falar de sistemas de chamados? Se sim, qual?',
    'seguranca_digital': 'Tem noções de segurança digital? (ex: senhas fortes, phishing, backups...)',
    'nivel_conhecimento_informatica': 'De 1 a 5, como você avalia seu nível atual de conhecimento em informática?',
    'area_curiosidade_tecnologia': 'Qual área da tecnologia você tem mais curiosidade ou gostaria de aprender?',
    'curso_treinamento_ti': 'Está fazendo algum curso ou treinamento de TI atualmente? Qual?',
    'situacao_dificil_tecnologia': 'Já passou por alguma situação difícil relacionada à tecnologia? Como lidou com isso?',
    'explicar_formatar': 'Se tivesse que explicar para alguém leigo o que é “formatar um computador”, como explicaria?',
    'mensagem_final': 'Deixe aqui uma mensagem final para a equipe — pode ser um comentário, sugestão ou por que você deveria ser escolhido(a)! '
};

// Captura o formulário
const form = document.getElementById('formulario');

//  Obter dados do LocalStorage 
function getSavedFormData() {
    const savedData = localStorage.getItem('formData');
    return savedData ? JSON.parse(savedData) : null;
}


form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita o comportamento padrão do formulário

  const formData = new FormData(form);
  const data = {};

  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbwbs3kwPR89lTHAFAEbBgVAeRV4NBAQYJLiebHGEul5OLZPgbSnEsHTI3wLiM7oWiNN/exec', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    });


//  Exportar para PDF
document.getElementById('exportPdf')?.addEventListener('click', async () => {

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const data = getSavedFormData();

    if (!data || Object.keys(data).length === 0) {
        alert('Nenhum dado de formulário encontrado para exportar. Preencha e envie o formulário primeiro.');
        return;
    }

    let y = 10;
    doc.setFontSize(12);
    doc.text(" Respostas do Formulário", 10, y);
    y += 10;

    Object.entries(data).forEach(([key, value]) => {
        const questionText = questionMap[key] || formatLabel(key);
        const texto = `${questionText} ${value}`;

        if (y > 280) {
            doc.addPage();
            y = 10;
        }

        const splitText = doc.splitTextToSize(texto, 180);
        doc.text(splitText, 10, y);
        y += (splitText.length * 7);
    });

    doc.save("formulario.pdf");
});

// Exportar para Excel
document.getElementById('exportExcel')?.addEventListener('click', () => {
    const data = getSavedFormData();

    if (!data || Object.keys(data).length === 0) {
        alert('Preencha todo o formulário ');
        return;
    }

    const dataArray = Object.entries(data).map(([key, value]) => ({
        Campo: questionMap[key] || formatLabel(key),
        Resposta: value
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataArray, { header: ["Campo", "Resposta"] });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Formulario");

    XLSX.writeFile(workbook, "formulario.xlsx");
});


//  Limpar Dados Salvos
document.getElementById('clearData')?.addEventListener('click', () => {
    // Remove o item 'formData' do LocalStorage
    localStorage.removeItem('formData');


    form.reset();

    alert('Dados do formulário salvos foram limpos!');
});


// 6. Formata as labels 
function formatLabel(campo) {
    return campo
        .replace(/_/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
}
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita o comportamento padrão do formulário

  const formData = new FormData(form);
  const data = {};

  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  try {
    const response = await fetch('http://localhost:3000/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert('Formulário enviado com sucesso!');
    } else {
      alert('Erro ao enviar o formulário!');
    }
  } catch (error) {
    alert('Erro de conexão!');
  }
});

const cors = require('cors');
app.use(cors());


*/

