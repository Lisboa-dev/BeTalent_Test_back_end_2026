
import {Gateway1, AdapterGateway1} from './providers/gateway1.ts'
import {Gateway2, AdapterGateway2} from './providers/gateway2.ts'
import type { ListGateways} from './baseGateway.ts'
import GatewayManager from './gatewayManager.ts'
import { Console } from 'console'


export  function gatewayFactory(listGatewaysActive:{name:string, priority:number}[]):ListGateways{
   
  const installed = new Map(
   [ //login seria um dto de login
     {login:{}, gateway: new Gateway1(), name:'gateway1'},
     {login:{}, gateway: new Gateway2(), name:'gateway2'}
   ].map(g => [g.name, g])
 )


   const listActive = listGatewaysActive
            .filter(g => installed.has(g.name))
            .map(g => ({
                ...g,
                ...installed.get(g.name)!
            }))
  
    return listActive.sort((a, b) => a.priority - b.priority)
}


export  default function gatewayManagerFactory(listGatewaysActive:{name:string, priority:number}[]){
 
  return new GatewayManager(gatewayFactory(listGatewaysActive))
}


