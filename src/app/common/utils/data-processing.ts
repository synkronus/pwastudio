import {orderBy, find, head, forEach, get, map, replace, lowerCase, filter, set} from "lodash";

import { getUnixTime } from 'date-fns';
import { SERVICE_LISTNAMES } from "../constants/constants";

let gnrlSvcMstrDt: { [s:string]:any } = {};
export class ProcessDataBy {

    constructor() { //TODO: get Array Svc list from store
    }


   public static SortItems(dt:any, order:string = 'desc') {
        return order === 'desc' ?
                    orderBy(dt,['id'],['desc']) :
                            orderBy(dt,['id'],['asc']);
    }

    public static ExtractObjPatch(colName: string, dtValue: any, arrayList : any[], objMdl?:any) {
        return find(arrayList,[colName, dtValue]);
    }

    public static ExtractDefaultObjPatch(arrayList?: any[], defaultVal?:any) {
        return head(arrayList) || defaultVal;
    }

    public static ExtractDefaultObjPatchDD(fName:string , fields ) {
        const fldDefChoices = find(fields, ['name', fName]);
        return find(get(fldDefChoices,['choices'],[]), ['nombre',fldDefChoices.defaultValue])
    }

    public static transformKeyArrayDtStruct<T>(arrIn:T[] , typeArr: string, codeCol?:string ) {
        let xRs: { [s:string]: any; } = {};
        switch(typeArr) {
            case SERVICE_LISTNAMES.CATEROGY.NAME :
                forEach(arrIn, i =>  { xRs[lowerCase(replace(get(i, ['nombre'], 'default'),/\s/g,''))] = get(i,['items'],[]); });
                return xRs;
            case SERVICE_LISTNAMES.PROVINCIAS.NAME :
            case SERVICE_LISTNAMES.MUNICIPIOS.NAME :
                xRs[ProcessDataBy.replaceStrLwr(typeArr)] = map(arrIn, r => ({...r, codigo:r[codeCol]}) );
                return  xRs
            case SERVICE_LISTNAMES.DIMENSIONES.NAME :
                xRs[ProcessDataBy.replaceStrLwr(typeArr)] = map(arrIn, r => ({...r, codigo:r[codeCol], nombre: r['descripcion']}) );
                return  xRs
            default:
                xRs[ProcessDataBy.replaceStrLwr(typeArr)] = filter(map(arrIn, r => ({...r, codigo:r[codeCol]})), i => (get(i, ['estatus']) == 'Activo'));
                return  xRs
        }
    }

    public static replaceStrLwr(str:string) {
        return lowerCase(replace(str,/\s/g,''));
    }

    public static getRandomStr(name?:string) {
        return (getUnixTime(new Date()) + new Date().getMilliseconds() + (name).toUpperCase()).toString();
    }

}
