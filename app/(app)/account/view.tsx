import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import PageWrapper from "@/components/wrappers/PageWrapper";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import appStyles from "@/constants/styles";
import { signOut } from "@/api/auth";
import PreferencesForm from "@/components/forms/PreferencesForm";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";
import { fetchUser, updateUser } from "@/api/user";
import { Preferences, User } from "@/types/user";

export default function Page() {
  const [userValue, setUser] = useState<User>();
  const [preferencesValue, setPreferences] = useState<Preferences>({
    weight: "",
    temperature: "",
  });
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session) {
      fetchUser().then((response) => {
        const { data } = response;
        console.log("fetchUser ~ data:", data);
        setUser(data);
        setPreferences({
          ...preferencesValue,
          weight: data.weight,
          temperature: data.temperature,
        });
      });
    }
  }, [session]);

  async function onUpdatePreferences() {
    if (!session?.user.id || !userValue || !preferencesValue) return;
    const newData: User = {
      ...userValue,
      weight: preferencesValue.weight,
      temperature: preferencesValue.temperature,
    };
    await updateUser(session?.user.id, newData);
  }
  async function onSignOut() {
    await signOut();
  }
  return (
    <PageWrapper title="Account">
      <PreferencesForm preferences={preferencesValue} setFn={setPreferences} />

      <TouchableOpacity style={appStyles.button} onPress={onUpdatePreferences}>
        <Text style={appStyles.buttonText}>Update</Text>
        <FontAwesome name="floppy-disk" size={20} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={appStyles.button} onPress={onSignOut}>
        <Text style={appStyles.buttonText}>Logout</Text>
        <FontAwesome name="arrow-right-from-bracket" size={20} color="white" />
      </TouchableOpacity>
    </PageWrapper>
  );
}
