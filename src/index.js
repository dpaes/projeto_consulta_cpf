//REFERENCIA O PUPPETEER PARA SER USADO
const puppeteer = require('puppeteer');

//URL A SER ACESSADA
const url = 'https://protestosp.com.br/Consulta/Index';

//CPF PARA CONSULTA
const cpf_desejado = '09352100913';

//FUNÇÃO ASSINCRONA (QUE SE COMPORTA DE FORMA SINCRONA USANDO OS AWAIT'S)
//CONFIGURADO COM HEADLESS FALSE(APRESENTA O NAVEGADOR EFETUANDO A OPERAÇÃO)
//DEFAULT VIEWPORT: SEM DEFINIÇÃO DE TAMANHO DE TELA E SLOWMO PARA CONTROLAR A VELOCIDADE (SIMULAR SER HUMANO)
(async () => {
    const browser = await puppeteer.launch({
        headless:false,
        defaultViewport:null,
        slowMo:80
    });

    //ABRE O NAVEGADOR CHROMIUM
    const page = await browser.newPage();

    //ACESSA A URL
    await page.goto(url);

    //ESPERA O SELETOR CSS DOS COOKIES CARREGAR
    await page.waitForSelector('#cookiefirst-root > div > div > div.cfAdwL.cf7ddU > div.cf2L3T.cfysV4.cf3l36 > div.cf3Tgk.cf2pAE.cf1IKf > div:nth-child(2) > button > span');

    //CLICA NO ACEITAR COOKIES
    await page.click('#cookiefirst-root > div > div > div.cfAdwL.cf7ddU > div.cf2L3T.cfysV4.cf3l36 > div.cf3Tgk.cf2pAE.cf1IKf > div:nth-child(2) > button > span');

    //ESPERA O SELETOR CSS DO ICONE DE TIPO DE ABRANGENCIA DE PESQUISA CARREGAR
    await page.waitForSelector('#AbrangenciaNacional');

    //CLICA NO ICONE ABRANGENCIA NACIONAL
    await page.click('#AbrangenciaNacional');

    //SELECIONA TIPO DE DOCUMENTO, CPF = OPÇÃO 1
    await page.select('select#TipoDocumento','1');

    //DIGITA O CPF SEGUNDO O QUE ESTÁ NA VARIAVEL CPF_DESEJADO (CONSTA NO COMEÇO DO CODIGO/\)
    await page.type('input#Documento',cpf_desejado);

    //ESPERA PELO SELETOR PARA PROXIMA AÇÃO
    await page.waitForSelector('.btn-padrao.blue.borderEffect2.mt-3.hoverEffect.wider3');

    //CLICA NO LOCAL INDICADO
    await page.click('.btn-padrao.blue.borderEffect2.mt-3.hoverEffect.wider3');

    //ESPERA POR 5 SEGUNDOS
    await page.waitForTimeout(5000);

    //TIRA UM PRINT DA TELA DE FORMA INTEIRA, JA QUE FOI CONFIGURADO FULLPAGE:TRUE
    await page.screenshot({path:'Consulta_CPF.jpeg',fullPage:true});

    //FECHA O NAVEGADOR, FINALIZANDO O PROGRAMA. (PRINT FICA SALVO DENTRO DO DIRETORIO)
    await browser.close();
})();