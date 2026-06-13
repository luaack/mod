import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";

const BootScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 60); // 100 steps * 60ms = 6 seconds total wait

    if (progress === 100) {
      setTimeout(onComplete, 500);
    }

    return () => clearInterval(interval);
  }, [progress, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center p-6"
    >
      <div className="max-w-xs w-full">
        <div className="mb-12 flex justify-center">
          <Logo
            className="w-10 h-10"
            textClassName="text-xl font-black tracking-tighter uppercase"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.3em]">
            <span>Inicializando Protocolo</span>
            <span>{progress}%</span>
          </div>

          {/* Brutalist Progress Bar */}
          <div className="w-full h-4 border-2 border-black p-0.5">
            <motion.div
              className="h-full bg-black"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="space-y-1">
              <p className="text-[8px] font-bold text-neutral-300 uppercase tracking-widest">
                Banco de Dados
              </p>
              <p className="text-[10px] font-black uppercase tracking-tight">
                Conexão
              </p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[8px] font-bold text-neutral-300 uppercase tracking-widest">
                Servidor
              </p>
              <p className="text-[10px] font-black uppercase tracking-tight">
                Iniciando...
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BootScreen;
