import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { Feather } from '@expo/vector-icons';
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const avaiableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

export function New(){
    const [weekDays, setWeekDays] = useState<number[]>([])
    const [title, setTitle] = useState('');

    function handleToggleWeekDay(weekDayIndex: number){
        if(weekDays.includes(weekDayIndex)){
            setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
        } else {
            setWeekDays(prevState => [...prevState, weekDayIndex]);
        }
    }

    async function handleCreateNewHabit(){
        try{
            if(!title.trim() || weekDays.length === 0){
                return Alert.alert('Novos', 'Informe um novo hábito e escolha um dia')
            }

            await api.post('/habit', { title, weekDays })

            setTitle('')
            setWeekDays([])


            Alert.alert('Novos', 'Habito criado com sucesso')

        } catch(erro) {
            console.log(erro)
        }

    }
    return(
        <View className="flex-1 bg-background px-8 pt-16" >
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}} >
                <BackButton /> 

                <Text className="mt-6 text-white font-extrabold text-3xl" >
                    Criar hábito
                </Text>
                
                <Text className="mt-6 text-white font-semibold text-base " >
                    Qual o seu comprometimento?
                </Text>

                <TextInput 
                    className="h-12 p-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
                    placeholder="Exercícios, dormir bem, etc..."
                    placeholderTextColor={colors.zinc[400]}
                    onChangeText={setTitle}
                    value={title}
                />

                <Text className="font-semibold mt-4 mb-3 text-white text-base">
                    Qual a recorrência?
                </Text>

                {
                    avaiableWeekDays.map((weekDay, i) => (
                        <Checkbox 
                            key={weekDay} 
                            title={weekDay} 
                            onPress={() => handleToggleWeekDay(i)} 
                            checked={weekDays.includes(i)}
                        />
                    )) 
                }

                <TouchableOpacity activeOpacity={0.7} className=" w-full h-14 items-center justify-center bg-green-600 rounded-md mt-6 flex-row" onPress={handleCreateNewHabit} >
                    <Feather name="check" size={20} color={colors.white} />

                    <Text className="font-semibold text-base text-white ml-2">
                        Confirmar
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}