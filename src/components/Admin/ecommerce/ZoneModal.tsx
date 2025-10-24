import React, { useRef } from "react";

type RiskZone = {
    id: string;
    description: string;
    address: string;
    latitude: number;
    longitude: number;
    imageUrl: string;
    status: string;
    createdAt: string;
};

interface Props {
    zone: RiskZone;
    relatedZones: RiskZone[];
    onClose: () => void;
    onSelectRelated: (zone: RiskZone) => void;
}

const ZoneModal: React.FC<Props> = ({ zone, relatedZones, onClose, onSelectRelated }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Fecha o modal se o clique foi fora do conteúdo
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-[99999] bg-black/40 flex justify-center items-center overflow-auto px-4 py-8"
            onClick={handleBackdropClick}
        >
            <div
                ref={modalRef}
                className="relative bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 w-full max-w-2xl shadow-xl overflow-hidden max-h-screen overflow-y-auto"
            >
                {/* Botão Fechar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-zinc-500 hover:text-red-400 text-2xl font-bold"
                    aria-label="Fechar"
                >
                    &times;
                </button>

                {/* Conteúdo */}
                <div className="p-6">
                    <h2 className="text-2xl font-semibold text-red-400 mb-2">{zone.description}</h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">{zone.address}</p>

                    {zone.imageUrl && (
                        <img
                            src={zone.imageUrl}
                            alt="Imagem da zona"
                            className="rounded-lg w-full h-64 object-cover mb-4 shadow"
                        />
                    )}

                    <p className="text-sm mb-2">
                        <strong>Estado:</strong> <span className="uppercase">{zone.status}</span>
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Criado em: {new Date(zone.createdAt).toLocaleDateString()}
                    </p>

                    {/* Zonas Interligadas */}
                    {relatedZones.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-lg font-medium mb-2">Zonas Interligadas</h3>
                            <ul className="space-y-1 pl-4 list-disc text-sm text-blue-700 dark:text-blue-400">
                                {relatedZones.map((z) => (
                                    <li
                                        key={z.id}
                                        onClick={() => onSelectRelated(z)}
                                        className="cursor-pointer hover:underline"
                                    >
                                        {z.description}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ZoneModal;
