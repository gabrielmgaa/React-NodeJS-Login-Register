import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"

export function replaceCreatedAt(date: string){
  // console.log(date);
  
  return format(parseISO(date), "dd/MM/yyyy", {
    locale: ptBR
  })
} 