export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            // Tipando as rotas disponíveis
            home: undefined;
            new: undefined;

            habit: {
                date: string;
            }
        }
    }
}


// Undefined é para quando a rota não necessita de nenhum parâmetro
// Na rota de habit, será necessário passar o parâmetro de date