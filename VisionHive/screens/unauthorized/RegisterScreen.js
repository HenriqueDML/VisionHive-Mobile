import React, { useState } from "react";
import { useAuth } from "../../hooks/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Image, Alert } from "react-native";
import MailIcon from "../../assets/mail-01.svg";
import LockUnlocked from "../../assets/lock-unlocked-04.svg";
import { useNavigation } from "@react-navigation/native";
import { Input } from "../../components/Inputs/Input";
import { Button } from "../../components/Buttons/Button";
import { useTranslation } from "react-i18next";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const { register } = useAuth();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (text) => {
    setEmail(text);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!regex.test(text) ? t('login:emailInvalid') : "");
  };

  const validatePassword = (text) => {
    setPassword(text);
    setPasswordError(text.length < 6 ? t('login:passwordLength') : "");
  };

  const handleRegister = async () => {
    let valid = true;

    if (!email) {
      setEmailError(t('login:fillEmail'));
      valid = false;
    } else if (emailError) valid = false;

    if (!password) {
      setPasswordError(t('login:fillPassword'));
      valid = false;
    } else if (passwordError) valid = false;

    if (!valid) return;

    setLoading(true);
    try {
      await register({ email, password });

      Alert.alert(t('common:success'), t('register:alertSuccessMessage'));
      navigation.replace("Login");
    } catch (error) {
      if (error?.code === "auth/email-already-in-use") setEmailError(t('register:alertEmailInUse'));
      else Alert.alert(t('register:alertErrorTitle'), error.message || "Ocorreu um erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }} keyboardShouldPersistTaps="handled">
        <Image
          source={require("../../assets/icons/logovision.jpg")}
          style={styles.logo}
        />
        <Text style={styles.title}>Vision Hive</Text>
        <Text style={styles.subtitle}>{t('register:subtitle')}</Text>

        <Input
          title={t('login:emailLabel')}
          icon={MailIcon}
          placeholder={t('login:emailPlaceholder')}
          value={email}
          onChangeText={validateEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#666"
          titleStyle={{ color: "#000" }}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <Input
          title={t('login:passwordLabel')}
          icon={LockUnlocked}
          placeholder={t('login:passwordPlaceholder')}
          value={password}
          onChangeText={validatePassword}
          secureTextEntry
          placeholderTextColor="#666"
          titleStyle={{ color: "#000" }}
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <Button label={loading ? "" : t('register:button')} onPress={handleRegister} style={styles.button}>
          {loading && <ActivityIndicator color="#fff" />}
        </Button>

        <View style={styles.loginRedirect}>
          <Text style={styles.noAccountText}>{t('register:hasAccount')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.registerText}>{t('register:login')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9FC",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: "contain",
    alignSelf: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -4,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#008000",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  loginRedirect: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    marginTop: 14,
  },
  noAccountText: { color: "#333", fontSize: 12 },
  registerText: { color: "#008000", fontWeight: "600", fontSize: 12 },
});