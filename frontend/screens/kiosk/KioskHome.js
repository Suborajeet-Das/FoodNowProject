import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { BASE_URL } from "../../api/config";

const KioskHome = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  
  // Verification State
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState(null); // 'SUCCESS' | 'ERROR'
  const [verifyMessage, setVerifyMessage] = useState("");

  // Ask for permission on mount
  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const handleBarCodeScanned = async ({ data, type }) => {
    setScanned(true);
    setIsVerifying(true);
    setVerifyResult(null);

    try {
      // 1. Parse QR JSON
      const parsed = JSON.parse(data);
      if (!parsed.orderId) {
        throw new Error("Invalid FoodNow QR Code formato.");
      }

      // 2. Call Backend Verify API
      const response = await fetch(`${BASE_URL}/orders/${parsed.orderId}/verify`, {
        method: "POST",
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || "Order is not ready or invalid.");
      }

      const responseData = await response.json();

      // 3. Success
      setVerifyResult("SUCCESS");
      setVerifyMessage(`Order #${responseData.orderId} Verified!\nHand food to customer.`);
    } catch (error) {
      console.warn("Scan Error:", error);
      setVerifyResult("ERROR");
      setVerifyMessage(error.message || "Failed to verify QR Code.");
    } finally {
      setIsVerifying(false);
    }
  };

  const resetScanner = () => {
    setScanned(false);
    setVerifyResult(null);
    setVerifyMessage("");
  };

  // --- Rendering UI States ---
  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={{ textAlign: "center", marginBottom: 12 }}>
          We need camera access to scan FoodNow QR tokens.
        </Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.buttonText}>Grant Camera Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* SCANNER VIEW */}
      {!verifyResult && !isVerifying && (
        <>
          <View style={styles.scannerWrapper}>
            <CameraView
              style={StyleSheet.absoluteFillObject}
              facing="back"
              barcodeScannerSettings={{
                barcodeTypes: ["qr"],
              }}
              onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            />
          </View>
          <Text style={styles.instructionText}>
            Align the QR code inside the box to scan
          </Text>
        </>
      )}

      {/* VERIFYING OVERLAY */}
      {isVerifying && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#FFF" />
          <Text style={styles.verifyingText}>Verifying Order...</Text>
        </View>
      )}

      {/* RESULT OVERLAYS */}
      {verifyResult === "SUCCESS" && (
        <View style={styles.resultCard}>
          <View style={[styles.iconContainer, { backgroundColor: "#E6F4EA" }]}>
            <Ionicons name="checkmark" size={60} color="#1E8E3E" />
          </View>
          <Text style={styles.resultTitle}>Scan Successful</Text>
          <Text style={styles.resultText}>
            {verifyMessage}
          </Text>
          <TouchableOpacity style={[styles.nextBtn, { backgroundColor: "#1E8E3E" }]} onPress={resetScanner}>
            <Text style={styles.nextBtnText}>Scan Next Order</Text>
          </TouchableOpacity>
        </View>
      )}

      {verifyResult === "ERROR" && (
        <View style={styles.resultCard}>
          <View style={[styles.iconContainer, { backgroundColor: "#FCE8E6" }]}>
            <Ionicons name="close" size={60} color="#D93025" />
          </View>
          <Text style={[styles.resultTitle, { color: "#D93025" }]}>Scan Failed</Text>
          <Text style={[styles.resultText, { color: "#5F6368" }]}>
            {verifyMessage}
          </Text>
          <TouchableOpacity style={[styles.nextBtn, { backgroundColor: "#D93025" }]} onPress={resetScanner}>
            <Text style={styles.nextBtnText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default KioskHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  scannerWrapper: {
    width: "80%",
    aspectRatio: 1,
    overflow: "hidden",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },
  instructionText: {
    color: "#fff",
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#1E90FF",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  verifyingText: {
    color: "#fff",
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  resultCard: {
    width: "85%",
    padding: 30,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1E8E3E",
    marginBottom: 8,
    textAlign: "center",
  },
  resultText: {
    fontSize: 16,
    color: "#4A4A4A",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  nextBtn: {
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 100,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  nextBtnText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
