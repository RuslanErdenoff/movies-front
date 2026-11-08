'use client'
import { environmentManager, QueryClient, QueryClientProvider } from "@tanstack/react-query"


let browserQueryClient: QueryClient | undefined = undefined


export function QueryProvider({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient()
    return (
        <QueryClientProvider client={queryClient} >
            {children}
        </QueryClientProvider>
    )
}


function createQueryClient(): QueryClient {
    const queryClient = new QueryClient(
        {
            defaultOptions: {
                queries: {
                    staleTime: 5 * 60 * 1000, // 5 минут
                    refetchOnWindowFocus: false,
                }
            }
        }
    );
    return queryClient;
}

function getQueryClient() {
    if (environmentManager.isServer()) {
        return createQueryClient()
    } else {
        if (!browserQueryClient) browserQueryClient = createQueryClient();
        return browserQueryClient;
    }
}