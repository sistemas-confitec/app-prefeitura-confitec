import React from 'react';
import { Text } from 'react-native';
import { MaterialCommunityIcons, AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { AirbnbRating } from 'react-native-elements';

import { colors } from '../config/Constants';

export function pad(n) {
	return (n < 10) ? ("0" + n) : n;
};

export function splitDate(date) {
	const jsDate = new Date(date);
	return {
		day: jsDate.getDate(),
		month: jsDate.getMonth() + 1,
		year: jsDate.getFullYear(),
		hour: jsDate.getHours(),
		minute: jsDate.getMinutes(),
		second: jsDate.getSeconds(),
	};
};


export function getAcaoIcon(tipo, response) {

	switch (tipo) {
		case "Tipo - Nota de 1 a 10":
			return <Text
				style={{
					width: 30,
					height: 30,
					borderWidth: 1,
					textAlign: 'center',
					textAlignVertical: 'center',
					borderRadius: 4,
					color: colors.secondary,
					borderColor: colors.secondary
				}}
			>{response}</Text>;

		case "Tipo - Ótimo Bom Regular Ruim":
			if (response === 'Ótimo') {
				return <MaterialIcons name="sentiment-very-satisfied" size={25} color={colors.secondary} />;
			} else if (response === 'Bom') {
				return <MaterialIcons name="sentiment-satisfied" size={25} color={colors.secondary} />;
			} else if (response === 'Regular') {
				return <MaterialIcons name="sentiment-neutral" size={25} color={colors.secondary} />;
			} else if (response === 'Ruim') {
				return <MaterialIcons name="sentiment-very-dissatisfied" size={25} color={colors.secondary} />;
			}
			return <Text>{response}</Text>;

		case "Tipo - Curti ou Não Curti":
			if (response === 'Curti') {
				return <AntDesign name="like2" size={25} color={colors.secondary} />;
			} else if (response === 'Não Curti') {
				return <AntDesign name="dislike2" size={25} color={colors.secondary} />;
			}
			return <Text>{response}</Text>;

		case "Tipo - 1 a 5 estrelas":
			if (response === '1 estrela') {
				return <AirbnbRating
					count={5}
					isDisabled={true}
					showRating={false}
					defaultRating={1}
					size={25}
				/>;
			} else if (response === '2 estrelas') {
				return <AirbnbRating
					count={5}
					isDisabled={true}
					showRating={false}
					defaultRating={2}
					size={25}
				/>;
			} else if (response === '3 estrelas') {
				return <AirbnbRating
					count={5}
					isDisabled={true}
					showRating={false}
					defaultRating={3}
					size={25}
				/>;
			} else if (response === '4 estrelas') {
				return <AirbnbRating
					count={5}
					isDisabled={true}
					showRating={false}
					defaultRating={4}
					size={25}
				/>;
			} else if (response === '5 estrelas') {
				return <AirbnbRating
					count={5}
					isDisabled={true}
					showRating={false}
					defaultRating={5}
					size={25}
				/>;
			}
			return <Text>{response}</Text>;

		default:
			return <Text>{response}</Text>;
	}
};


export function getLRFInformation(lrf) {

	switch (lrf) {
		case "RGF":
			return {
				title: 'O que é RGF?',
				info: 'O RGF é um dos instrumentos de Transparência da Gestão Fiscal criados pela Lei de Responsabilidade Fiscal (LRF). Especificamente, o RGF objetiva o controle, o monitoramento e a publicidade do cumprimento, por parte dos entes federativos, dos limites estabelecidos pela LRF: Despesas com Pessoal, Dívida Consolidada Líquida, Concessão de Garantias e Contratação de Operações de Crédito. Todos esses limites são definidos em percentuais da Receita Corrente Líquida (RCL), que é apurada em demonstrativo próprio e. Ao final do exercício, a LRF exige ainda a publicação de demonstrativos que evidenciem as Disponibilidades de Caixa e a Inscrição de Restos a Pagar.'
			};
		case "PCPE":
			return {
				title: 'O que é PCPE?',
				info: 'Os Procedimentos Contábeis Patrimoniais, aborda os aspectos relacionados ao reconhecimento, mensuração, registro, apuração, avaliação e controle do patrimônio público, adequando-os aos dispositivos legais vigentes e aos padrões internacionais de contabilidade do setor público. Os Procedimentos Contábeis Específicos, padroniza os conceitos e procedimentos contábeis relativos ao FUNDEB, às Parcerias Público-Privadas, às Operações de Crédito, ao Regime Próprio da Previdência Social, à Dívida Ativa e a outros procedimentos de que trata.'
			};
		case "RREO":
			return {
				title: 'O que é RREO?',
				info: 'Composto por diversos demonstrativos, o \"Relatório Resumido da Execução Orçamentária\" exigido pela LRF, em seu Artigo 52 e de elaboração e publicação bimestral, até trinta dias após o encerramento de cada bimestre, tem por finalidade evidenciar a situação fiscal do Ente, de forma especial da execução orçamentária da receita e despesa sob diversos enfoques, propiciando desta forma à sociedade, órgãos de controle interno e externo e ao usuário da informação pública em geral, conhecer, acompanhar e analisar o desempenho das ações governamentais estabelecidas na Lei de Diretrizes orçamentárias – LDO e na Lei Orçamentária.'
			};
		case "LOA":
			return {
				title: 'O que é LOA?',
				info: 'LOA pode ser definida como a lei que estima as receitas que serão arrecadadas no exercício seguinte e autoriza a realização das despesas decorrentes do plano de governo. As ações de governo são limitadas por um teto de despesa, mas, se houver necessidade, a lei prevê que a prefeitura poderá abrir crédito suplementar. Por outro lado, pode-se, em cada ação do governo, não se gastar nada; donde se conclui que as emendas do Legislativo podem não ser realizadas.'
			};
		case "LDO":
			return {
				title: 'O que é LDO?',
				info: 'A LDO estabelece diretrizes para a confecção da Lei Orçamentária Anual (LOA), contendo metas, prioridades e despesas de capital para o exercício financeiro seguinte, orienta a elaboração de orçamentos, alterações na legislação tributária e política de aplicação nas agências financeiras de fomento. (Ação do governo que visa o desenvolvimento de um país, de uma região ou de um setor econômico).'
			};
		case "PPA":
			return {
				title: 'O que é PPA?',
				info: 'O Plano Plurianual, no Brasil, previsto no artigo 165 da Constituição Federal e regulamentado pelo Decreto 2.829, de 29 de outubro de 1998 é um plano de médio prazo, que estabelece as diretrizes, objetivos e metas a serem seguidos pelo Governo Federal, Estadual ou Municipal ao longo de um período de quatro anos.'
			};
		case "PRGFIN":
			return {
				title: 'O que é PRGFIN?',
				info: 'Programação financeira deve ser entendida como um mecanismo responsável por racionalizar a liberação de recursos financeiros necessários ao custeio das despesas previstas na lei orçamentária anual, através da compatibilização entre o ritmo da realização das despesas previstas, segundo a probabilidade de arrecadação.'
			};
		case "CMED":
			return {
				title: 'O que é CMED?',
				info: 'O Cronograma Mensal de Desembolso foi instituído no Art. 8 da Lei de Responsabilidade Fiscal e o seu principal objetivo é organizar a previsão de dispêndios de recursos. Então, o cronograma fixa quantitativamente e periodicamente, a cada mês, as despesas que serão realizadas pelo ente público.'
			};
		case "PCG":
			return {
				title: 'O que é PCG?',
				info: 'A Prestação de Contas é dever constitucional dos que utilizam, arrecadam, guardam, gerenciam ou administram dinheiros, bens e valores públicos. As contas de governo são prestadas anualmente pelo prefeito à respectiva câmara municipal, inclusive com o cadastramento e apresentação em meio eletrônico no sistema disponibilizado pelo Tribunal, abrangendo todos os poderes, órgãos, entidades e fundos da administração municipal, conforme a Lei Orçamentária Anual (LOA) a que se refere o Art. 165, §5º, da Constituição Federal de 1988, e, ainda, de acordo com o estabelecido na Lei nº 12.160/93 (Lei Orgânica do TCM).'
			};
		case "PCS":
			return {
				title: 'O que é PCS?',
				info: 'A Prestação de Contas de Gestão, instituída pelo Tribunal de Contas do Estado, visa permitir que o mesmo possa julgar as contas dos administradores e demais responsáveis por dinheiro, bens e valores públicos da administração direta e indireta, assim como as contas daqueles que derem causa a perda, extravio ou outra irregularidade de que resulte prejuízo ao Erário.'
			};
		default:
			return {
				title: '',
				info: ''
			};
	}
};