import { useState } from 'react';
import TablaSistemas2 from './tablasistemas2';

function ResumenSistemas() {
    const [selectedSistema, setSelectedSistema] = useState<number | string | null>(null);

    const handleSistemaSelect = (key_sistema: string | null) => {
        setSelectedSistema(key_sistema);
    };

    return (
        <>
            <h1>Resumen de sistemas</h1>
            <TablaSistemas2 onSistemaSelect={handleSistemaSelect} />

        </>
    );
}

export default ResumenSistemas;