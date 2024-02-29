import { VerifyFilledIcon, InvalidFilledIcon, SendCheckFilledIcon } from "@/components/icons";
import { usernameIsExist } from "@/services/actions/form-action.auth";
import { usernameSchema } from "@/services/validation/schema";
import { ExistsResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { Input } from '@nextui-org/input'
import { useState, Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface UsernameValidationPropsType {
    setDiabled: Dispatch<SetStateAction<boolean>>
}

const UsernameValidationForm = (props: UsernameValidationPropsType) => {
    const [username, setUsername] = useState<string>('');
    const [isExist, setIsExist] = useState<boolean | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(usernameSchema),
    });

    const usernameHandler = async (formData: any) => {
        setIsLoading(true);
        const response: ExistsResponse = await usernameIsExist(formData);
        const { username } = formData;
        setUsername(username);
        setIsExist(response.status.ok);
        props.setDiabled(response.status.ok ? true : false);
        setIsLoading(false);
    };

    return (
        <form className='flex items-center gap-2' onSubmit={handleSubmit(usernameHandler)}>
            <Input
                {...register('username')}
                errorMessage={errors['username'] ? String(errors['username']?.message) : isExist && username && `username ${username} is already exists, Please try another username.`}
                label='Username'
                type='text'
                variant='underlined'
                description='Validate your username before do next our forms.'
                color={`${username && isExist ? 'danger' : username && !isExist ? 'success' : 'default'}`}
                endContent={
                    username && <Tooltip color='primary' content={`${username} is ${isExist ? 'already exists.' : 'not exists'}`}>
                        <div>
                            {!isExist ? <VerifyFilledIcon color='#088f03' size={20} /> : <InvalidFilledIcon color='#b91830' size={20} />}
                        </div>
                    </Tooltip>
                }
            />
            <Tooltip color='primary' content="Check username is exists">
                <Button type='submit' className=' bg-transparent border border-primary' isIconOnly={true} isLoading={isLoading}>
                    <SendCheckFilledIcon size={16} />
                </Button>
            </Tooltip>
        </form>
    );
};

export default UsernameValidationForm