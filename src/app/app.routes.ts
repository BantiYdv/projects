import { Routes } from '@angular/router';
import { OxGameComponent } from './OX_GAME/ox-game/ox-game.component';
import { GroundMatchComponent } from './OX_GAME/ground-match/ground-match.component';

export const routes: Routes = [
    {path:"",component:OxGameComponent},
    {path:"play-game", component:GroundMatchComponent}
];
