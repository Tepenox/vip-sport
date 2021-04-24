import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {


  imagesS = [
  {
    src: '../assets/sports/sport1.jpg',
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
    description: 'Le judo (litt. « voie de la souplesse ») est un art martial créé en tant que pédagogie physique, mentale et morale au Japon par Jigoro Kano en 1882. Par rapport au Kobudo ou voie martiale traditionnelle de combat japonaises, le judo est ce qu’on appelle un Shin Budo c’est-à-dire une «voie martial moderne » qui connait une branche qui a évolué en sport de combat et en sport olympique en 1964.'
  },
  {
    src: '../assets/sports/sport4.jpg',
    name: "Bobsleigh",
    description: 'Le bobsleigh (ou bobsled, ou encore bob par abréviation) est un sport d’hiver dans lequel des équipes de deux ou quatre bobeurs, assis en file, effectuent des courses chronométrées à bord d’un engin caréné glissant sur une étroite et sinueuse piste glacée en pente. Le pilote dirige le bobsleigh grâce à deux anneaux liés aux patins, les pousseurs donnent sa vitesse à l’engin au début du parcours et le freineur (également pousseur) freine à la fin du parcours.'
  },
  {
    src: '../assets/sports/sport5.jpg',
    name: "Ultimate",
    description: 'Le sport s’appelait à l’origine ultimate Frisbee avant d être officiellement renommé afin d’éviter l’emploi de la marque déposée Frisbee. L’ultimate est un sport collectif utilisant un disque opposant deux équipes de sept joueurs. L’objectif est de marquer des points en progressant sur le terrain par des passes successives vers la zone d’en-but adverse et d’y rattraper le disque. L’ultimate se pratique dans sa version la plus courante sur terrain en herbe à l’extérieur (7 contre 7). L’ultimate se pratique également dans une version adaptée aux personnes handicapées physiques : on l’appelle ultimate fauteuil. '
  },
  {
    src: '../assets/sports/sport6.jpg',
    name: "Tennis",
    description: 'Le tennis est un sport de raquette qui oppose soit deux joueurs (on parle alors de jeu en simple) soit quatre joueurs qui forment deux équipes de deux (on parle alors de jeu en double).'
  }
  ];

  

  constructor() { }

  ngOnInit(): void {
  }

}
