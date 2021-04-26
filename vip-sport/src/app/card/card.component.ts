import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {


  imagesS = [
  {
    src: '../assets/sports/sport1.2.jpg',
    name: "Haltérophilie",
    description: 'L’haltérophilie est un sport consistant à soulever des poids. C’est un sport de force nécessitant également maîtrise d une technique particulière, vitesse, souplesse, coordination et équilibre. En compétition, deux mouvements sont évalués : l’arraché et l’épaulé-jeté. L’athlète dispose de trois essais pour chaque mouvement. La somme du meilleur essai réalisé par l’athlète à l’arraché et du meilleur essai à l’épaulé-jeté donne le total olympique. L’athlète ayant le meilleur total olympique de sa catégorie de poids de corps l’emporte.'
  },
  {
    src: '../assets/sports/sport2.jpg',
    name: "Cyclisme",
    description: 'Le cyclisme recouvre plusieurs notions concernant la bicyclette : il est d’abord une activité quotidienne pour beaucoup, un loisir pour d’autres (cyclotourisme), enfin un sport proposant des courses selon plusieurs disciplines : l’école de cyclisme, le cyclisme sur route, le cyclisme sur piste, le cyclo-cross, le vélo tout terrain (abrégé couramment VTT), le BMX, le cyclisme en salle et le polo-vélo. Le principe du cyclisme dans sa version sportive est de parcourir une distance donnée à bicyclette le plus rapidement possible.  Les pratiquants sont répartis dans des catégories en fonction de leur âge, de leur sexe et de leur niveau.'
  },
  {
    src: '../assets/sports/sport3.jpg',
    name: "Judo",
    description: 'Le judo (litt. « voie de la souplesse ») est un art martial créé en tant que pédagogie physique, mentale et morale au Japon par Jigoro Kano en 1882. Par rapport au Kobudo ou voie martiale traditionnelle de combat japonaises, le judo est ce qu’on appelle un Shin Budo c’est-à-dire une «voie martial moderne » qui connait une branche qui a évolué en sport de combat et en sport olympique en 1964. Sa caractéristique la plus proéminente est de projeter, soit d’amener l’adversaire au sol et de l’immobiliser (Techniques de maîtrise) ou de l’obliger à abandonner à l’aide de clés articulaires et d’étranglements.'
  },
  {
    src: '../assets/sports/sport4.jpg',
    name: "Bobsleigh",
    description: 'Le bobsleigh (ou bobsled, ou encore bob par abréviation) est un sport d’hiver dans lequel des équipes de deux ou quatre bobeurs, assis en file, effectuent des courses chronométrées à bord d’un engin caréné glissant sur une étroite et sinueuse piste glacée en pente. Le pilote dirige le bobsleigh grâce à deux anneaux liés aux patins, les pousseurs donnent sa vitesse à l’engin au début du parcours et le freineur (également pousseur) freine à la fin du parcours. Les deux grandes nations du bobsleigh sont la Suisse et l’Allemagne. Cependant d’autres nations se sont parfois jointes à la course aux titres telles que l’Italie, l’Autriche, le Canada, les États-Unis et la Jamaïque.'
  },
  {
    src: '../assets/sports/sport5.jpg',
    name: "Ultimate",
    description: 'Le sport s’appelait à l’origine ultimate Frisbee avant d être officiellement renommé afin d’éviter l’emploi de la marque déposée Frisbee. L’ultimate est un sport collectif utilisant un disque opposant deux équipes de sept joueurs. L’objectif est de marquer des points en progressant sur le terrain par des passes successives vers la zone d’en-but adverse et d’y rattraper le disque. L’ultimate se pratique dans sa version la plus courante sur terrain en herbe à l’extérieur (7 contre 7). L’ultimate se pratique également dans une version adaptée aux personnes handicapées physiques : on l’appelle ultimate fauteuil. '
  },
  {
    src: '../assets/sports/sport6.jpg',
    name: "Tennis",
    description: 'Le tennis est un sport de raquette qui oppose soit deux joueurs (on parle alors de jeu en simple) soit quatre joueurs qui forment deux équipes de deux (on parle alors de jeu en double). Cette raquette, dont les matériaux peuvent varier, sert à frapper une balle en caoutchouc, remplie d’air et recouverte de feutre. Le but du jeu est de frapper la balle de telle sorte que l’adversaire ne puisse la remettre dans les limites du terrain, soit en marquant le point en mettant l’adversaire hors de portée de la balle, soit en l’obligeant à commettre une faute (si sa balle ne retombe pas dans les limites du court, ou si elle ne passe pas le filet).'
  }
  ];

  

  constructor() { }

  ngOnInit(): void {
  }

}
