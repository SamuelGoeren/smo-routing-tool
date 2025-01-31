import { KingdomProps } from "interface/interface";
import { loadFileAndGetLines } from "../util/utils";


export const kingdomData : KingdomProps[] = [
    {
        name: "Cascade",
        moonNames: await loadFileAndGetLines("/moonlists/cascademoons.txt"),
        moonsToLeave: 5,
        moonRequirements: [-1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        multiMoons: [1],
        moonColor: "yellow"
    },
    {
        name: "Sand",
        moonNames: await loadFileAndGetLines("/moonlists/sandmoons.txt"),
        moonsToLeave: 16,
        moonRequirements: [-1,0,-1,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,-1,-1,-1,2,-1,-1,3,3,-1,-1,-1,-1,3,3,3,3,-1,-1,3,3,-1,3,3,3,-1,-1,-1,-1,-1,-1,-1,2,2,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,3],
        multiMoons: [2, 3],
        moonColor: "green"
    },
    {
        name: "Lake",
        moonNames: await loadFileAndGetLines("/moonlists/lakemoons.txt"),
        moonsToLeave: 8,
        moonRequirements: [-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,-1,-1,-1,0,0,-1,-1,-1,0,-1,-1,-1,-1,-1,-1,0],
        multiMoons: [0],
        moonColor: "pink",
    },
    {
        name: "Wooded",
        moonNames: await loadFileAndGetLines("/moonlists/woodedmoons.txt"),
        moonsToLeave: 16,
        moonRequirements: [-1,0,1,2,-1,-1,-1,-1,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,1,3,-1,-1,-1,1,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,3,-1,-1,1,1,-1,-1,-1,-1,3,3,-1,-1],
        multiMoons: [1, 3],
        moonColor: "blue",
    },
    {
        name: "Lost",
        moonNames: await loadFileAndGetLines("/moonlists/lostmoons.txt"),
        moonsToLeave: 10,
        moonRequirements: [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-2-1,-1,-1,-1,-1,-1,-1,-1,],
        multiMoons: [],
        moonColor: "yellow"
    },
    {
        name: "Metro",
        moonNames: await loadFileAndGetLines("/moonlists/metromoons.txt"),
        moonsToLeave: 20,
        moonRequirements: [-1,[0,-3],[0,-3],[0,-3],[0,-3],[0,1,2,3,4],[0,1,2,3,4],-1,-1,-1,0,0,0,0,0,0,6,0,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,[0,1,2,3,4],5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,[6,-4],0],
        multiMoons: [0, 6],
        moonColor: "brown"
    },
    {
        name: "Snow",
        moonNames: await loadFileAndGetLines("/moonlists/snowmoons.txt"),
        moonsToLeave: 10,
        moonRequirements: [-1,-1,-1,-1,-1,-1,-1,-1,-1,4,-1,-1,4,4,4,4,4,-1,-1,4,-1,4,4,4,4,4,4,4,-1,-1,4,4,-1,-1,],
        multiMoons: [4],
        moonColor: "orange"
    },
    {
        name: "Seaside",
        moonNames: await loadFileAndGetLines("/moonlists/seasidemoons.txt"),
        moonsToLeave: 10,
        moonRequirements: [-1,-1,-1,-1,[0,1,2,3],-1,-1,-1,-1,-1,-1,-1,-1,-1,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,4,-1,-1,-1,4,-1,-1,-1,4,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        multiMoons: [4],
        moonColor: "purple"
    },
    {
        name: "Luncheon",
        moonNames: await loadFileAndGetLines("/moonlists/luncheonmoons.txt"),
        moonsToLeave: 18,
        moonRequirements: [-1,0,1,2,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,4,-1,-1,-1,-1,-1,-1,-1,-1,2,2,2,2,2,2,4,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,[4,-4],2],
        multiMoons: [2, 4],
        moonColor: "lightblue"
    },
    {
        name: "Ruined",
        moonNames: await loadFileAndGetLines("/moonlists/ruinedmoons.txt"),
        moonsToLeave: 3,
        moonRequirements: [-1,-1,0,0],
        multiMoons: [0],
        moonColor: "yellow"
    },
    {
        name: "Bowser's",
        moonNames: await loadFileAndGetLines("/moonlists/bowsersmoons.txt"),
        moonsToLeave: 8,
        moonRequirements: [-1,0,1,2,-1,1,1,2,3,3,2,-1,2,2,3,1,3,-1,-1,2,-1,0,2,1,1,2,3,2,1,3,1,1,3,3,3,3,2,2],
        multiMoons: [3],
        moonColor: "yellow"
    },
    {
        name: "Moon",
        moonNames: await loadFileAndGetLines("/moonlists/moonmoons.txt"),
        moonsToLeave: 0,
        moonRequirements : [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        multiMoons: [],
        moonColor: "lightyellow"
    }
]