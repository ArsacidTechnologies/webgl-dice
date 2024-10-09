"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    createUnityInstance: (
      canvas: HTMLCanvasElement,
      config: {
        dataUrl: string;
        frameworkUrl: string;
        codeUrl: string;
        streamingAssetsUrl?: string;
        companyName?: string;
        productName?: string;
        productVersion?: string;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<any>;
  }
}

const UnityLoader: React.FC = () => {
  useEffect(() => {
    // Load the Unity WebGL loader script dynamically
    const unityLoaderScript = document.createElement("script");
    unityLoaderScript.src = "/unity/Build/dice.loader.js";
    unityLoaderScript.async = true;
    document.body.appendChild(unityLoaderScript);

    // Initialize Unity WebGL once the script is loaded
    unityLoaderScript.onload = () => {
      const canvas = document.getElementById(
        "unityCanvas"
      ) as HTMLCanvasElement;

      if (window.createUnityInstance && canvas) {
        const buildUrl = "/unity/Build/";

        window
          .createUnityInstance(canvas, {
            dataUrl: buildUrl + "dice.data",
            frameworkUrl: buildUrl + "dice.framework.js",
            codeUrl: buildUrl + "dice.wasm",
            streamingAssetsUrl: "StreamingAssets",
            companyName: "MyCompany",
            productName: "MyProduct",
            productVersion: "1.0",
          })
          .then((unityInstance) => {
            console.log("Unity instance loaded", unityInstance);
          })
          .catch((message) => {
            console.error(message);
          });
      }
    };

    return () => {
      // Clean up the loader script when the component is unmounted
      document.body.removeChild(unityLoaderScript);
    };
  }, []);

  return (
    <canvas id="unityCanvas" style={{ width: "80%", height: "70%" }}></canvas>
  );
};

export default UnityLoader;
