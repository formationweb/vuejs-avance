import { beforeEach, describe, expect, test, vi } from "vitest";
import { UsersService } from "../users";
import axios from 'axios'

vi.mock('axios')

const mockedAxios = vi.mocked(axios)

describe('Tester le service', () => {
    let usersService: UsersService

    beforeEach(() => {
        usersService = new UsersService()
    })

    test('Tester GetAll', async () => {
        const data = [
                {
                    id: 1,
                    name: 'john'
                }
            ]
        mockedAxios.get.mockResolvedValue({
            data
        })
        const result = await usersService.getAll()
        expect(mockedAxios.get).toHaveBeenCalled()
        expect(result).toEqual(data)
    })
})