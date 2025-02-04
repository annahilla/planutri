import { useState, useEffect } from "react"

export const useUnits = () => {
    const [units, setUnits] = useState<string[]>([]);

    useEffect(() => {
        const fetchUnits = async () => {
          const response = await fetch("/api/units");
          const data = await response.json();
          const units = data[0].units;
          setUnits(units);
        };
        fetchUnits();
      }, []);

    return units;
}